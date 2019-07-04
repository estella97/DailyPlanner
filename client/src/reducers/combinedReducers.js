import { combineReducers } from 'redux';
import { UPDATE_FEELINGS, SELECT_COMMUTE } from '../actions/actionDictionary';
import { defaultCommuteType } from '../components/commute/commuteDictionary';
// import { dictionary } from '../components/feelings/feelingsDictionary'

const timeReducer = (time, action) => {
    return {};
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