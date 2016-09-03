import Ember from 'ember';

const { Component, isBlank, inject: { service } } = Ember;

export default Component.extend({
  tagName: 'form',
  classNames: ['action-input'],
  toast: service(),
  didReceiveAttrs() {
    this._super(...arguments);
    this.set('stashedSearchText', this.get('searchText'));
  },

  submit(e) {
    e.preventDefault();
    let searchText = this.get('stashedSearchText');
    if (isBlank(searchText)) {
      this.get('toast').error('Please provide a search text');
      return;
    }

    this.attrs['onSearch'](searchText);
  }
});
