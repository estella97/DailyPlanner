import { UPDATE_FEELINGS, FLIP_STATUS, PLAN, SELECT_COMMUTE, SET_CURR_LOCATION, SET_TIME } from './actionDictionary';

function plan() {
    return {type: PLAN};
}

function selectTime(time) {
    return {type: SET_TIME, time: time};
}

function selectCommute(commute) {
    return {type: SELECT_COMMUTE, commute: commute};
}

function selectFeelings(feelings) {
    return {type: UPDATE_FEELINGS, feelings: feelings};
}

function updateLocation(lat, lon) {
    return {type: SET_CURR_LOCATION, lat: lat, lon: lon};
}

export { selectTime, selectFeelings, plan, selectCommute, updateLocation };
