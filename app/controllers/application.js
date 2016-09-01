import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: [
    'searchText'
  ],
  searchText: '',

  actions: {
    showResults(repos) {
      this.set('model', repos);
    }
  }
});
