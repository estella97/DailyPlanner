import { combineReducers } from 'redux';
import { FLIP_STATUS, SELECT_COMMUTE, SET_CURR_LOCATION, SET_TIME } from '../actions/actionDictionary';
import { defaultCommuteType } from '../components/commute/commuteDictionary';
import { dictionary } from '../components/feelings/feelingsDictionary'

const timeReducer = (time="Select available time period", action) => {
    if (action.type === SET_TIME) {
        return action.time + " hours";
    }
    return time;
}

function generateInitFeelings() {
    let feelings = {};
    for (let feeling of dictionary) {
        feelings[feeling] = false;
    }
    return feelings
}

const feelingReducer = (feeling=generateInitFeelings(), action) => {
    if (action.type === FLIP_STATUS) {
        feeling = {...feeling, [action.feeling]: !feeling[action.feeling]};
    }
    return feeling;
}

const commuteReducer = (commute=defaultCommuteType, action) => {
    if (action.type === SELECT_COMMUTE) {
        commute = action.commute;
    }
    return commute;
}

const userSelectionReducer = (userSelection, action) => {
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
    userSelection: userSelectionReducer,
    map: mapReducer
});