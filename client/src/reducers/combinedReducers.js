import { combineReducers } from 'redux';
import { FLIP_STATUS, SELECT_COMMUTE } from '../actions/actionDictionary';
import { defaultCommuteType } from '../components/commute/commuteDictionary';
import { dictionary } from '../components/feelings/feelingsDictionary'

const timeReducer = (time, action) => {
    return {};
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
    console.log(commute)
    if (action.type === SELECT_COMMUTE) {
        commute = action.commute;
    }
    return commute;
}

const userSelectionReducer = (userSelection, action) => {
    return {};
}

export default combineReducers({
    time: timeReducer,
    feelings: feelingReducer,
    commute: commuteReducer,
    userSelection: userSelectionReducer
});