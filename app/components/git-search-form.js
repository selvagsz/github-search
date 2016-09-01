import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'form',
  classNames: ['action-input'],
  ajax: Ember.inject.service(),

  init() {
    this._super(...arguments);
    this.set('searchText', '');
  },

  submit(e) {
    this.set('isLoading', 'true');
    this.get('ajax').request('/search/repositories', {
      data: {
        q: this.get('searchText')
      }
    }).then((response) => {
      this.attrs['on-search'](response.items);
    }).finally(() => {
      this.set('isLoading', false);
    });

    e.preventDefault();
  }
});
