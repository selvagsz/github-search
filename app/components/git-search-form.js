import Ember from 'ember';

const { Component, isPresent, isBlank, inject: { service } } = Ember;

export default Component.extend({
  tagName: 'form',
  classNames: ['action-input'],

  submit(e) {
    this.attrs['on-search'](this.get('searchText'));
    e.preventDefault();
  }
});
