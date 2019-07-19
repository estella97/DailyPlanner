import { PUT_FEEDBACK, DELETE_FEEDBACK, GET_FEEDBACK, TOGGLE_FORM_INPUT, CLEAR_FORM, UPDATE_TITLE, UPDATE_NAME, UPDATE_FEEDBACK } from '../actions/actionDictionary'

const initialState = {
	title: "",
	name: "",
	feedback: ""
}

export const formReducer = (state = initialState, action) => {
	switch(action.type) {
		case UPDATE_TITLE:
			return { ...state, title: action.payload };
		case UPDATE_NAME:
			return { ...state, name: action.payload };
		case UPDATE_FEEDBACK:
			return { ...state, feedback: action.payload };
		case CLEAR_FORM:
			return initialState;
		default:
			return state
	}
}

export const formViewReducer = (show = false, action) => {
	if (action.type === TOGGLE_FORM_INPUT) {
		return !action.payload;
	}
	return show;
}

export const feedbackReducer = (posts = null, action) => {
	switch (action.type) {
		case GET_FEEDBACK:
			return action.payload;
		case DELETE_FEEDBACK:
			return posts.filter(post => post._id !== action.payload);
		case PUT_FEEDBACK:
			if (posts === null) {
				return [action.payload];
			}
			return [...posts, action.payload]
		default:
			return posts;
	}
}
