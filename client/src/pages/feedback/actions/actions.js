import { Meteor } from 'meteor/meteor';
import { PUT_FEEDBACK, DELETE_FEEDBACK, GET_FEEDBACK, TOGGLE_FORM_INPUT, CLEAR_FORM, UPDATE_TITLE, UPDATE_FEEDBACK, UPDATE_NAME } from './actionDictionary.js'

export const updateField = (newValue, fieldType) => {
    switch(fieldType) {
        case UPDATE_TITLE:
            return {
                type: UPDATE_TITLE,
                payload: newValue
            };
        case UPDATE_NAME:
            return {
                type: UPDATE_NAME,
                payload: newValue
            };
        case UPDATE_FEEDBACK:
            return {
                type: UPDATE_FEEDBACK,
                payload: newValue
            }
        case CLEAR_FORM:
            return {
                type: CLEAR_FORM
            }
        default:
           return; 
    }; 
}

export const putFeedback = (newFeedback) => {
    return {
        type: PUT_FEEDBACK,
        payload: newFeedback
    };
}

export const putFeedbackData = (newFeedback) => {
    return (dispatch) => {
        Meteor.call('addFeedback', 
        {   
            _id: newFeedback._id,
            title: newFeedback.title,
            name: newFeedback.name,
            feedback: newFeedback.feedback
        })
        .catch(error => {
            throw error;
        })
        .then(
            dispatch(putFeedback(newFeedback))
        );
    };
}

export const getFeedback = (data) => {
    return {
        type: GET_FEEDBACK,
        payload: data
    };
}

export const getFeedbackData = () => {
    return (dispatch) => {
        Meteor.call('getFeedback')
            .catch(error => {
                throw(error);
            })
            .then(response => {
                dispatch(fetchFeedback(response.data))
            })
    };       
};

export const deleteFeedback = (feedbackid) => {
    return {
        type: DELETE_FEEDBACK,
        payload: feedbackid
    }
}
export const deleteFeedbackData = (feedbackid) => {
    return (dispatch) => {
        Meteor.call('deleteFeedback', {
            data: {
                id: feedbackid
            }
        })
        .then(
            dispatch(deleteThought(feedbackid))
        );
    };
}

export const toggleFormInput = (show) => {
    return {
        type: TOGGLE_FORM_INPUT,
        payload: show
    };
}

export const clearForm = () => {
    return {
        type: CLEAR_FORM
    }
}
