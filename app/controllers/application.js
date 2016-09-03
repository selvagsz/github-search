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
      this.get('model').clear().pushObjects(repos);
    },

    setSearchText(searchText) {
      this.setProperties({
        searchText,
        page: 1
      });
    },

    setPage(page) {
      this.set('page', page);
    }
  }
});
