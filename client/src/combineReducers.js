import { combineReducers } from 'redux';
import { formReducer, feedbackReducer, formViewReducer } from './pages/feedback/reducers/reducers';
import { timeReducer, feelingReducer, commuteReducer, userSelectionReducer, mapReducer } from './pages/main/reducers/reducers';

export default combineReducers({
    // feedback
    form: formReducer,
    posts: feedbackReducer,
    showForm: formViewReducer,

    // main
    time: timeReducer,
    feelings: feelingReducer,
    commute: commuteReducer,
    plan: userSelectionReducer,
    map: mapReducer
});
