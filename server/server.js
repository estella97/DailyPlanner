import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { HTTP } from 'meteor/http';

checkStringFormat();

const db = new MongoInternals.RemoteCollectionDriver(process.env.MONGO_URL);
const dbManagerCollectionName = "PlannerDataManager";
const feedbackCollectionName = "PlannerFeedback"
const CACHE_EXPIRE_TIME = 100000000; // ms // TODO
let dbManagerCollection = null;
let feedbackCollection = null;
let areaDatabase = {};

Meteor.startup(() => {
    dbManagerCollection = new Mongo.Collection(dbManagerCollectionName, { _driver: db });
    dbManagerCollection.schema = new SimpleSchema({
        areaCollectionName: { type: String },
        lastUpdateTimestamp: { type: Number }
    });
    feedbackCollection = new Mongo.Collection(feedbackCollectionName, { _driver: db });
    feedbackCollection.schema = new SimpleSchema({
        feedback: { type: String },
        email: { type: String }
    });
});

Meteor.methods({
    plan: (time, commute, feelings, geoPoint, radius) => {
        try {
            return plan(time, commute, feelings, geoPoint, radius);
        } catch (e) {
            console.error(e);
            throw new Meteor.Error("Something wrong.", "Please retry later!")
        }
    },
    addFeedback: (feedbackObj) => {
        feedbackCollection.insert(feedbackObj);
    },
    getFeedback: () => {
        return feedbackCollection.find({}).fetch();
    }
});

function plan(time, commute, feelings, geoPoint, radius) {
    let places = [];
    let areaCollections = calculateAreasCoveredByRadius(geoPoint, radius);
    for (let areaCollectionName of areaCollections) {
        let placesInThisArea = null;
        if (needsUpdate(areaCollectionName)) {
            placesInThisArea = updateAreaCollection(areaCollectionName);
        } else {
            placesInThisArea = areaDatabase[areaCollectionName].find({}).fetch();
        }
        places = places.concat(placesInThisArea);
    }
    places = reduceDuplicatePlaces(places);
    console.log("Found " + places.length + " possible places");
    places = places.filter(place =>
        withinRadius(place, geoPoint, radius) &&
        isOpening(place) &&
        matchFeelings(place, feelings)
    );
    console.log("After filtering, found " + places.length + " possible places")

    let plan = [];
    while (time > 0 && places.length > 0) {
        let placesCanVisitWithinTime = places.filter(place =>
            estimateCommuteTime(place, geoPoint, commute) + timeSpendInEachPlace < time
        );
        if (placesCanVisitWithinTime.length === 0) break;
        placesCanVisitWithinTime.sort((placeA, placeB) =>
            measure(geoPoint.lat, geoPoint.lng, placeA.geometry.location.lat, placeA.geometry.location.lng) -
            measure(geoPoint.lat, geoPoint.lng, placeB.geometry.location.lat, placeB.geometry.location.lng)
        );
        // randomly select one nearby place from placesCanVisitWithinTime
        let maxRandomIndex = placesCanVisitWithinTime.length > 5 ? 5 : placesCanVisitWithinTime.length;
        let place = placesCanVisitWithinTime[Math.floor(Math.random() * maxRandomIndex)];
        place["spendTime"] = timeSpendInEachPlace;
        let estimatedCommuteTime = estimateCommuteTime(place, geoPoint, commute);
        let commuteInfo = {
            commuteFrom: geoPoint,
            commuteType: commute,
            commuteTime: convertHrToMin(estimatedCommuteTime)
        };
        plan.push(commuteInfo);
        plan.push(place);
        // update for the next iteration
        remove(places, place);
        time -= (estimatedCommuteTime + timeSpendInEachPlace);
        geoPoint = place.geometry.location;
    }
    console.log("Received a plan request with paramemters: {0} hours, using {1}, feeling {2}, at {3}, within in {4} kms".format(
        time, commute, feelings, JSON.stringify(geoPoint), radius
    ));
    console.log("Calculated Results: " + JSON.stringify(plan));
    return plan;
}

function reduceDuplicatePlaces(places) {
    // use google place_id to avoid duplicate places
    places = places.reduce((places, currPlace) => {
        places[currPlace.place_id] = currPlace;
        return places;
    }, {});
    return Object.values(places);
}

function withinRadius(place, geoPoint, radius) {
    return measure(geoPoint.lat, geoPoint.lng, place.geometry.location.lat, place.geometry.location.lng) < radius;
}

function isOpening(place) {
    // true if opening_hours is not applicable || is actually open
    return place.opening_hours === undefined || place.opening_hours.open_now;
}

function matchFeelings(place, feelings) {
    if (feelings.length === 0) {
        return true;
    }
    let matchedTypes = matchFeelingsToTypes(feelings);
    return place.types.reduce((matchFeelings, currPlaceType) => {
        return matchFeelings || matchedTypes.has(currPlaceType)
    }, false);
}

function estimateCommuteTime(place, geoPoint, commute) {
    // return an estimated commute time between two geo points (using the given commute type)
    let distance = measure(geoPoint.lat, geoPoint.lng, place.geometry.location.lat, place.geometry.location.lng);
    // estimateLongestPath = perimeter of the isosceles right angle - distance
    let estimateLongestPath = Math.sqrt(2) * distance;
    return estimateLongestPath / avgCommuteSpeed[commute];
}

function convertHrToMin(hr) {
    return Math.floor(hr * 60);
}

function needsUpdate(areaCollectionName) {
    // A collection needs to be updated when it doesn't exist in the database manager or it's expired
    let result = dbManagerCollection.find({ areaCollectionName: areaCollectionName }).fetch();
    return result.length === 0 || areaDatabase[areaCollectionName] === undefined || Date.now() - result[0].lastUpdateTimestamp > CACHE_EXPIRE_TIME;
}

function updateAreaCollection(areaCollectionName) {
    console.log("Updating Area Collection: " + areaCollectionName + " at " + Date.now());
    // update database manager to reflect the update
    dbManagerCollection.remove({ areaCollectionName: areaCollectionName }, err => {
        if (err !== null) {
            console.error(err);
        }
    });
    dbManagerCollection.insert({ areaCollectionName: areaCollectionName, lastUpdateTimestamp: Date.now() });
    // create area collection or clear its previous data
    if (areaDatabase[areaCollectionName] === null || areaDatabase[areaCollectionName] === undefined) {
        console.log("Area collection doesn't exist before --- Creating new area collection: " + areaCollectionName);
        areaDatabase[areaCollectionName] = new Mongo.Collection(areaCollectionName, { _driver: db });
    } else {
        areaDatabase[areaCollectionName].remove({});
    }
    // fetch places data from google at the center of this area
    let centerGeoPoint = areaCollectionNameToCenterGeoPoint(areaCollectionName);
    let places = fetchPlacesFromGoogle(centerGeoPoint);
    for (let place of places) {
        areaDatabase[areaCollectionName].insert(place);
    }
    return places;
}

// TODO: might need to disable this key as it's on the internet
const GOOGLE_KEY = "AIzaSyBou9WAraqZGu5xbYGcp1H01owc9QxhSqw";
const GOOGLE_PLACES_TYPES = ["aquarium", "art_gallery", "bar", "beauty_salon", "book_store", "cafe",
    "clothing_store", 'electronics_store', 'gym', 'hair_care', 'hardware_store', 'home_goods_store',
    'jewelry_store', 'library', 'meal_takeaway', 'movie_theater', 'museum', 'night_club', 'park',
    'pet_store', 'pharmacy', 'restaurant', 'shoe_store', 'shopping_mall', 'spa', 'store', 'supermarket', 'zoo'];

// TODO: enable all types, probably also needs to reduce request rate
// const GOOGLE_PLACES_TYPES = [
//     "restaurant", "park", "bar", "beauty_salon", "book_store", "cafe", 'spa', 'store', 'supermarket', "library"
// ]
function fetchPlacesFromGoogle(geoPoint) {
    let places = [];
    for (let type of GOOGLE_PLACES_TYPES) {
        let baseUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
        let params = "location={0},{1}&radius=50000&type={2}&key={3}".format(geoPoint.lat, geoPoint.lng, type, GOOGLE_KEY);
        let result = HTTP.call('GET', baseUrl + params);
        places = places.concat(result.data.results);
    }
    return places;
}

function calculateAreasCoveredByRadius(geoPoint, radius) {
    console.log(geoPoint)
    // find the areas that covered by the radius, invalid geopoints will be ignored when fetching from Google
    // the offset 1 for the surrounding ares is corresponding to the area collection naming schema
    let areas = [geoPoint,
        { ...geoPoint, lat: geoPoint.lat + 1 },
        { ...geoPoint, lat: geoPoint.lat - 1 },
        { ...geoPoint, lng: geoPoint.lng + 1 },
        { ...geoPoint, lng: geoPoint.lng - 1 }
    ].filter(areaGeoPoint => measure(geoPoint.lat, geoPoint.lng, areaGeoPoint.lat, areaGeoPoint.lng) < radius);
    return areas.map(geoPoint => geoPointToAreaCollectionName(geoPoint));
}

function geoPointToAreaCollectionName(geoPoint) {
    // Naming schema:
    // {floorLat}to{ceilLat}and{floorLng}to{ceilLng}
    // Note that Latitude & Longitude 1 deg ≈ 111 km
    // use "to" to avoid the negative sign effect during parsing
    return "{0}to{1}and{2}to{3}".format(Math.floor(geoPoint.lat), Math.ceil(geoPoint.lat),Math.floor(geoPoint.lng), Math.ceil(geoPoint.lng));
}

function areaCollectionNameToCenterGeoPoint(areaCollectionName) {
    // Naming schema:
    // {floorLat}to{ceilLat}and{floorLng}to{ceilLng}
    // convert an area collection name to the center geoPoint of this area
    let latPair = areaCollectionName.split("and")[0].split("to").map(num => parseFloat(num));
    let lngPair = areaCollectionName.split("and")[1].split("to").map(num => parseFloat(num));
    return { lat: (latPair[0] + latPair[1]) / 2, lng: (lngPair[0] + lngPair[1]) / 2 };
}

function measure(lat1, lng1, lat2, lng2) {
    // Ref: https://en.wikipedia.org/wiki/Haversine_formula
    var R = 6378.137; // Radius of earth in KM
    var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
    var dlng = lng2 * Math.PI / 180 - lng1 * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dlng / 2) * Math.sin(dlng / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d * 1000; // return the distance in meters
}

function matchFeelingsToTypes(feelings) {
    let types = [];
    for (let feeling of feelings) {
        types = types.concat(feelingsDictionary[feeling]);
    }
    return new Set(types);
}

// Const Definitions:
const timeSpendInEachPlace = 0.75;

const avgCommuteSpeed = {
    // avgCommuteSpeed in m/h to calculate commute time
    "bike": 15000,
    "bus": 15000,
    "walk": 4000,
    "car": 35000
};

// 'Happy'
// 'Sad'
// 'Hungry'
// 'Active'
// 'Lazy'
// 'Excited'
// 'Friendly'
// 'Quiet'
//"restaurant", "park", "bar", "beauty_salon", "book_store", "cafe", 'spa', 'store', 'supermarket', "library"
const feelingsDictionary = {
    "Happy": [
        "bar",
        "restaurant",
        "bar",
        "book_store"
    ],
    "Sad": [
        "park",
        "cafe"
    ],
    "Hungry": [
        "restaurant",
        "cafe",
        "supermarket"
    ],
    "Active": [
        "park"
    ],
    "Lazy": [
        "restaurant",
        "spa"
    ],
    "Excited": [
        "bar"
    ],
    "Friendly": [
        "bar",
        "park"
    ],
    "Quiet": [
        "book_store",
        "library"
    ]
};

// JavaScript Helpers:
function remove(array, element) {
    const index = array.indexOf(element);
    array.splice(index, 1);
}

function checkStringFormat() {
    if (!String.prototype.format) {
        String.prototype.format = function () {
            let args = arguments;
            return this.replace(/{(\d+)}/g, function (match, number) {
                return typeof args[number] != 'undefined' ? args[number] : match;
            });
        };
    }
}