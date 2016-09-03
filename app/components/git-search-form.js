import Ember from 'ember';

const { Component, isPresent, isBlank, inject: { service } } = Ember;

export default Component.extend({
  tagName: 'form',
  classNames: ['action-input'],
  didReceiveAttrs() {
    this._super(...arguments);
    this.set('stashedSearchText', this.get('searchText'));
  },

  submit(e) {
    this.attrs['onSearch'](this.get('stashedSearchText'));
    e.preventDefault();
  }
});
