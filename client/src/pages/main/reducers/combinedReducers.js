import { combineReducers } from 'redux';
import { FLIP_STATUS, UPDATE_FEELINGS, SELECT_COMMUTE, SET_CURR_LOCATION, SET_TIME, PLAN } from '../actions/actionDictionary';
import { defaultCommuteType } from '../components/commute/commuteDictionary';
// import { dictionary } from '../components/feelings/feelingsDictionary'

const timeReducer = (time="Select available time period", action) => {
    if (action.type === SET_TIME) {
        return action.time + " hours";
    }
    return time;
}

// function generateInitFeelings() {
//     let feelings = {};
//     for (let feeling of dictionary) {
//         feelings[feeling] = false;
//     }
//     return feelings
// }

const feelingReducer = (feelings=[], action) => {
    if (action.type === UPDATE_FEELINGS) {
        feelings = action.feelings;
    }
    return feelings;
}

const commuteReducer = (commute=defaultCommuteType, action) => {
    if (action.type === SELECT_COMMUTE) {
        commute = action.commute;
    }
    return commute;
}
// TODO
let temp = 1;
const userSelectionReducer = (userSelection={}, action) => {
    if (action.type === PLAN) {
        return {"haha": temp++};
    }
    return {};
}

const mapReducer = (map={ lat: 32, lng: 32 }, action) => {
    if (action.type === SET_CURR_LOCATION) {
        map = {lat: action.lat, lng: action.lon};
    }
    return map;
}

export default combineReducers({
    time: timeReducer,
    feelings: feelingReducer,
    commute: commuteReducer,
    plan: userSelectionReducer,
    map: mapReducer
});