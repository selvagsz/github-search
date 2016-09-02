import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: [
    'searchText',
    'page'
  ],
  searchText: '',
  page: 1,

  actions: {
    showResults(repos) {
      this.set('model', repos);
    }
  }
});
