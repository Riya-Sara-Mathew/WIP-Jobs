import { REHYDRATE } from 'redux-persist';
import {
  LIKE_JOB,
  CLEAR_LIKED_JOBS
} from '../actions/types';

const uniqBy = function (arr, key) {
  let seen = new Set()

  return arr.filter(it => {
    let val = it[key]
    if (seen.has(val)) {
      return false
    } else {
      seen.add(val)
      return true
    }
  })
}
export default function(state = [], action) {
  switch (action.type) {
    case REHYDRATE:
      return action.payload.likedJobs || [];
    case CLEAR_LIKED_JOBS:
      return [];
    case LIKE_JOB:
      return uniqBy([
        action.payload, ...state
      ], 'jobkey');
    default:
      return state;
  }
}
