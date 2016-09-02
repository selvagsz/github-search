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

  searchRepos(searchText) {
    searchText = searchText || this.get('searchText');

    if (isBlank(searchText)) {
      this.get('toast').error('Please provide a search text');
      return;
    }

    this.set('isLoading', 'true');
    return this.get('ajax').request('/search/repositories', {
      data: {
        q: this.get('searchText'),
        sort: 'stars',
        order: 'desc',
        page: this.get('page')
      }
    }).then((response) => {
      this.attrs['on-search'](response.items);
      this.set('totalPages', response.last.page);
    }).catch((error) => {
      this.get('toast').error(error);
    }).finally(() => {
      this.set('isLoading', false);
    });
  },

  actions: {
    gotoPage(page) {
      this.set('page', page);
      this.searchRepos();
    }
  }
});
