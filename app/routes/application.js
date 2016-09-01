import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return [];
  },

  resetController: function(controller, isExiting, transition) {
    if (isExiting) {
      controller.set('searchText', '');
    }
  }
});
