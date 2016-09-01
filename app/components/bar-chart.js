import Ember from 'ember';
import BarChart from 'github-search/viz/bar-chart';

export default Ember.Component.extend({
  didInsertElement() {
    debugger;
    this._super(...arguments);
    d3.select(`#${this.elementId}`)
      .datum(this.get('data'))
      .call(
        BarChart()
          .width(300)
          .height(105)
          .margin(0)
          .color('#f6f6f6')
      );
  }
})
