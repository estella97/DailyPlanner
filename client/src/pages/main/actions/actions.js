import { UPDATE_FEELINGS, FLIP_STATUS, PLAN, SELECT_COMMUTE, SET_CURR_LOCATION, SET_TIME } from './actionDictionary';
import { Meteor } from 'meteor/meteor';
import { API } from '../../../../../API';
import { history } from '../../nav/history';

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

function plan(time, commute, feelings, geoPoints, radius) {
    // TODO: add validations here
    Meteor.call(API.plan.name, (time, commute, feelings, geoPoints, radius), (err, res) => {
        if (err) {
            // TODO: handle this err
        } else {
            // TODO: somehow store the results before redirecting to the next page
            history.push('/result');
        }
    });
    return {type: PLAN};
}

export { selectTime, selectFeelings, plan, selectCommute, updateLocation };
