import Ember from 'ember';
import GH_LANG_COLORS from 'github-search/utils/gh-lang-colors';

const { Component, computed } = Ember;

export default Component.extend({
  tagName: 'li',
  classNames: ['search-result-item'],
  attributeBindings: ['borderLeftColor:style'],

  borderLeftColor: computed('repo.language', {
    get() {
      return `border-left-color: ${GH_LANG_COLORS[this.get('repo.language')]}`;
    }
  })
});
