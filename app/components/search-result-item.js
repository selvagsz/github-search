import Ember from 'ember';
import GH_LANG_COLORS from 'github-search/utils/gh-lang-colors';
import config from 'github-search/config/environment';

const { Component, computed, inject: { service } } = Ember;

export default Component.extend({
  ajax: Ember.inject.service(),
  tagName: 'li',
  classNameBindings: [':search-result-item', 'isFlipped'],
  toast: service(),

  languageColor: computed('repo.language', {
    get() {
      return Ember.String.htmlSafe(GH_LANG_COLORS[this.get('repo.language')]);
    }
  }),

  init() {
    this._super(...arguments);
    this.set('weeklyStats', []);
  },

  didReceiveAttrs() {
    this._super(...arguments);

    if (config.environment === 'development') {
      this.set('weeklyStats', [
        15,
        47,
        24,
        23,
        29,
        13,
        18,
        27,
        30,
        17,
        57,
        33,
        32,
        31,
        46,
        37,
        39,
        16,
        32,
        43,
        36,
        5,
        24,
        86,
        63,
        55
      ]);
    } else if (this.get('index') <= 2) { // Show contributions graphs for the first 3 repos alone (To prevent exceeding the API rate limit)
      this.get('ajax').request(`/repos/${this.get('repo.full_name')}/stats/participation`).then((response) => {
        // Display recent 6 months contributions alone
        this.set('weeklyStats', (response.all || []).slice(-26));
      }).catch((error) => {
        this.get('toast').error((error.errors && error.errors[0].detail.message) || error.message);
      });
    }
  },

  actions: {
    flip() {
      this.toggleProperty('isFlipped');
    }
  }
});
