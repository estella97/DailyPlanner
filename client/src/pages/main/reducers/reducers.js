
import { FLIP_STATUS, UPDATE_FEELINGS, SELECT_COMMUTE, SET_CURR_LOCATION, SET_TIME, PLAN } from '../actions/actionDictionary';
import { defaultCommuteType } from '../components/commute/commuteDictionary';
// import { dictionary } from '../components/feelings/feelingsDictionary'

export const timeReducer = (time=1, action) => {
    if (action.type === SET_TIME) {
        return action.time;
    }
    return time;
}

export const feelingReducer = (feelings=[], action) => {
    if (action.type === UPDATE_FEELINGS) {
        feelings = action.feelings;
    }
    return feelings;
}

export const commuteReducer = (commute=defaultCommuteType, action) => {
    if (action.type === SELECT_COMMUTE) {
        commute = action.commute;
    }
    return commute;
}

export const mapReducer = (map={ lat: 32, lng: 32 }, action) => {
    if (action.type === SET_CURR_LOCATION) {
        map = {lat: action.lat, lng: action.lon};
    }
    return map;
}
