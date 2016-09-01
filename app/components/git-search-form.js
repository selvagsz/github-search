import Ember from 'ember';

const { Component, isPresent, isBlank, inject: { service } } = Ember;

export default Component.extend({
  tagName: 'form',
  classNames: ['action-input'],
  ajax: service(),
  toast: service(),

  init() {
    this._super(...arguments);
    if (isPresent(this.get('searchText'))) {
      this.searchRepos();
    }
  },

  searchRepos() {
    let searchText = this.get('searchText');

    if (isBlank(searchText)) {
      this.get('toast').error('Please provide a search text');
      return;
    }

    this.set('isLoading', 'true');
    this.get('ajax').request('/search/repositories', {
      data: {
        q: this.get('searchText'),
        sort: 'stars',
        order: 'desc'
      }
    }).then((response) => {
      this.attrs['on-search'](response.items);
    }).finally(() => {
      this.set('isLoading', false);
    });
  },

  submit(e) {
    this.searchRepos();
    e.preventDefault();
  }
});
