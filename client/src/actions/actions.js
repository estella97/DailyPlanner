import { UPDATE_FEELINGS, PLAN, SELECT_COMMUTE } from './actionDictionary';

function plan() {
    return {type: PLAN};
}

function selectCommute(commute) {
    return {type: SELECT_COMMUTE, commute: commute};
}

function selectFeelings(feelings) {
    return {type: UPDATE_FEELINGS, feelings: feelings};
}

export { selectFeelings, plan, selectCommute };