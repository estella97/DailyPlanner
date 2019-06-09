import { FLIP_STATUS, PLAN, SELECT_COMMUTE } from './actionDictionary';

function plan() {
    return {type: PLAN};
}

function selectCommute(commute) {
    return {type: SELECT_COMMUTE, commute: commute};
}

function selectFeeling(feeling) {
    return {type: FLIP_STATUS, feeling: feeling};
}

export { selectFeeling, plan, selectCommute };