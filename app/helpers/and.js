import Ember from 'ember';

const { isArray, isPresent } = Ember;

function normalize(param) {
  return isArray(param)? isPresent(param) : param;
}

export function and(params/*, hash*/) {
  return normalize(params[0]) && normalize(params[1]);
}

export default Ember.Helper.helper(and);
