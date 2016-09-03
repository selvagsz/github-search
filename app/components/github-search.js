import Ember from 'ember';

const { Component, isPresent, isBlank, inject: { service } } = Ember;

export default Component.extend({
  ajax: service(),
  toast: service(),

  init() {
    this._super(...arguments);
    if (isPresent(this.get('searchText'))) {
      this.searchRepos();
    }
  },

  didUpdateAttrs() {
    this._super(...arguments);
    if (isPresent(this.get('searchText'))) {
      this.searchRepos();
    }
  },

  searchRepos(searchText) {
    searchText = searchText || this.get('searchText');

    this.set('isLoading', true);
    return this.get('ajax').request('/search/repositories', {
      data: {
        q: this.get('searchText'),
        sort: 'stars',
        order: 'desc',
        page: this.get('page')
      }
    }).then((response) => {
      this.attrs['onSearch'](response.items);
      this.set('totalPages', (response.last && response.last.page) || null);
    }).catch((error) => {
      this.get('toast').error((error.errors && error.errors[0].detail.message) || error.message);
    }).finally(() => {
      this.set('isLoading', false);
    });
  }
});
