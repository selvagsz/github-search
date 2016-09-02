import Ember from 'ember';
import AjaxService from 'ember-ajax/services/ajax';
import { getPaginationParams } from 'github-search/utils/gh-pagination';

const { isPresent, merge } = Ember;

export default AjaxService.extend({
  host: 'https://api.github.com',
  isSuccess(status, headers, payload ) {
    let isSuccess = this._super(...arguments);
    let paginationParams = getPaginationParams(headers.Link);
    if (isPresent(Object.keys(paginationParams))) {
      merge(payload, paginationParams);
    }
    return isSuccess;
  }
});
