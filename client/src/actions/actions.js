import { FLIP_STATUS, PLAN, SELECT_COMMUTE, SET_CURR_LOCATION, SET_TIME } from './actionDictionary';

function plan() {
    return {type: PLAN};
}

function selectTime(time) {
    return {type: SET_TIME, time: time};
}

function selectCommute(commute) {
    return {type: SELECT_COMMUTE, commute: commute};
}

function selectFeeling(feeling) {
    return {type: FLIP_STATUS, feeling: feeling};
}

function updateLocation(lat, lon) {
    return {type: SET_CURR_LOCATION, lat: lat, lon: lon};
}

export { selectTime, selectFeeling, plan, selectCommute, updateLocation };