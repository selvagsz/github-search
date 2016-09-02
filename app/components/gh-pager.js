import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  classNames: ['pagination'],
  isFirstPage: computed.equal('currentPage', 1),
  isLastPage: computed('currentPage', 'totalPages', {
    get() {
      return Number(this.get('currentPage')) === Number(this.get('totalPages'));
    }
  }),

  actions: {
    onNext(currentPage) {
      this.attrs['goto'](++currentPage);
    },

    onPrev(currentPage) {
      this.attrs['goto'](--currentPage);
    }
  }
});
