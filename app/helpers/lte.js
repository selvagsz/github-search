import Ember from 'ember';

export function lte(params/*, hash*/) {
  return params[0] <= params[1];
}

export default Ember.Helper.helper(lte);
