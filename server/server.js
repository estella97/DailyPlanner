import { Meteor } from "meteor/meteor";
import { API } from '../API';
import { Mongo } from "meteor/mongo";
import { HTTP } from 'meteor/http'

const db = new MongoInternals.RemoteCollectionDriver(process.env.MONGO_URL);
const dbManagerCollectionName = "PlannerDataManager";
let dbManagerCollection = null;
let areaDatabase = {};

Meteor.startup(() => {
    dbManagerCollection = new Mongo.Collection(dbManagerCollectionName, { _driver: db });
    dbManagerCollection.schema = new SimpleSchema({
        areaCollection: { type: String },
        lastUpdateTimestamp: { type: Number }
    });
});

Meteor.methods({
    plan: (time, commute, feelings, geoPoints, radius) => {
        let params = [time, commute, feelings, geoPoints, radius];
        if (validParam(params, API.plan.input)) {
            // TODO
            geoPoints = { lat: 49.263395499999994, lng: -123.25604360000001 };
            let possibleSuggestions = findPossibleSuggestions(geoPoints, radius);
            return plan(possibleSuggestions, time, commute, feelings);
        } else {
            throw new Meteor.Error('Invalid Args', 'Invalid Inputs');
        }
    },
});

function plan(possibleSuggestions, time, commute, feelings) {
    // TODO
    let show = [1,3,4,5,6,7];
    return show.map(i => {
        return formResponse(possibleSuggestions[i]);
    });
}

function formResponse(data) {
    // TODO
    return {
        "geopoint": data.geometry.location,
        "name": data.name,
        "rating": data.rating
    }
}

function findPossibleSuggestions(geoPoints, radius) {
    let areaCollections = [calculateAreaCollectionName(geoPoints)];
    // TODO: need to adjust the radius effects
    let suggestions = [];
    for (let areaCollection of areaCollections) {
        suggestions = suggestions.concat(updateAreaCollection(areaCollection));
    }
    return suggestions;
}

function updateAreaCollection(areaCollection) {
    let currDate = new Date();
    let currTimestamp = currDate.getTime();
    let result = dbManagerCollection.find({ areaCollection: areaCollection }).fetch();
    if (result.length !== 0 && currTimestamp - result[0].lastUpdateTimestamp < 100) { // TODO: adjust time comparison
        // No need to udpate
        return areaDatabase.areaCollection.find({}).fetch();
    }
    dbManagerCollection.remove({ areaCollection: areaCollection }, err => {
        if (err !== null) {
            console.log(err);
        }
    });
    dbManagerCollection.insert({ areaCollection: areaCollection, lastUpdateTimestamp: currTimestamp });
    // Not sure the best way to update the area collection, might have performance issue here
    if (areaDatabase.areaCollection === null || areaDatabase.areaCollection === undefined) {
        areaDatabase.areaCollection = new Mongo.Collection(areaCollection, { _driver: db });
    } else {
        areaDatabase.areaCollection.remove({});
    }
    // TODO: fetch places data from google at the center of this area
    let centerGeoPoint = calculateAreaCenterGeoPoint(areaCollection);
    let places = fetchPlacesFromGoogle(centerGeoPoint);
    for (let place of places) {
        areaDatabase.areaCollection.insert(place);
    }
    return places;
}

// TODO: disable this API key
const GOOGLE_KEY = "AIzaSyBou9WAraqZGu5xbYGcp1H01owc9QxhSqw";
function fetchPlacesFromGoogle(centerGeoPoint) {
    let url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={0},{1}&radius=50000&type=restaurant&key={2}".format(centerGeoPoint.lat, centerGeoPoint.lng, GOOGLE_KEY);
    let result = HTTP.call('GET', url);
    return result.data.results;
}

function calculateAreaCenterGeoPoint(areaName) {
    // TODO: parse & calculate
    return { lat: 49.26339549, lng: -123.2560436 };
}

function calculateAreaCollectionName(geoPoints) {
    checkStringFormat();
    // Naming schema:
    // FloorTwoLat-CeilTwoLat,FloorTwoLng-CeilTwoLng
    return "{0}-{1},{2}-{3}".format(floorTwo(geoPoints.lat), ceilTwo(geoPoints.lat), floorTwo(geoPoints.lng), ceilTwo(geoPoints.lng));
}

function floorTwo(num) {
    return Math.floor((num + 0.00001) * 100) / 100;
}

function ceilTwo(num) {
    return Math.ceil((num + 0.00001) * 100) / 100;
}

function validParam(params, toValidate) {
    // TODO: valid parameters types
    return true;
}

function checkStringFormat() {
    if (!String.prototype.format) {
        String.prototype.format = function () {
            var args = arguments;
            return this.replace(/{(\d+)}/g, function (match, number) {
                return typeof args[number] != 'undefined' ? args[number] : match;
            });
        };
    }
}

// old code
// const mongoose = require('mongoose');
// const express = require('express');
// var cors = require('cors');
// const bodyParser = require('body-parser');
// const logger = require('morgan');
// const Data = require('./data');

// const API_PORT = 3001;
// const app = express();
// app.use(cors());
// const router = express.Router();

// // const dbRoute = 'mongodb+srv://admin:admin@cluster0-an3ch.mongodb.net/test?retryWrites=true&w=majority';

// // mongoose.connect(dbRoute, { useNewUrlParser: true });
// // let db = mongoose.connection;
// // db.once('open', () => console.log('connected to the database'));
// // db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(logger('dev'));

// router.get('/getData', (req, res) => {
//   Data.find((err, data) => {
//     if (err) return res.json({ success: false, error: err });
//     return res.json({ success: true, data: data });
//   });
// });

// router.post('/updateData', (req, res) => {
//   const { id, update } = req.body;
//   Data.findByIdAndUpdate(id, update, (err) => {
//     if (err) return res.json({ success: false, error: err });
//     return res.json({ success: true });
//   });
// });

// router.delete('/deleteData', (req, res) => {
//   const { id } = req.body;
//   Data.findByIdAndRemove(id, (err) => {
//     if (err) return res.send(err);
//     return res.json({ success: true });
//   });
// });

// router.post('/putData', (req, res) => {
//     let data = new Data();

//     const { name, type, feelings, location } = req.body;
//     if (!name || !type || !feelings || !location) {
//         return res.json({
//         success: false,
//         error: 'INVALID INPUTS',
//         });
//     }
//     data.name = name;
//     data.type = type;
//     data.feelings = feelings;
//     data.location = location;
//     data.save((err) => {
//         if (err) return res.json({ success: false, error: err });
//         return res.json({ success: true });
//     });
// });

// app.use('/api', router);

// app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
