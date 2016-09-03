import Ember from 'ember';

const { Component, isBlank, computed } = Ember;

export default Component.extend({
  classNames: ['pagination'],
  isFirstPage: computed.equal('currentPage', 1),
  isLastPage: computed('currentPage', 'totalPages', {
    get() {
      let totalPages = this.get('totalPages');
      return isBlank(totalPages) || Number(this.get('currentPage')) === Number(totalPages);
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
