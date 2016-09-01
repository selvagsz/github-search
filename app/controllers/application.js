import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    showResults(repos) {
      this.set('model', repos);
    }
  }
})
