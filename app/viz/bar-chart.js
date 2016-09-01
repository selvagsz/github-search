// Taken from my age old blog http://selvagsz.blogspot.in/2013/10/bar-chart-with-simple-tooltip.html

// Charts Reusability - https://bost.ocks.org/mike/chart/

function BarChart() {
  // default values
  let width = 500;
  let height = 500;
  let margin = {
    top: 20,
    bottom: 20,
    left: 20,
    right: 20
  };
  let color = 'steelblue';

  function chart(selection) {
    selection.each(function(data) {
      let _height = height - margin.top - margin.bottom;
      let _width = width - margin.left - margin.right;

      let svg = d3.select(this).append('svg')
        .attr('width', width)
        .attr('height', height);

      let barContainer = svg.append('g')
        .attr('class', 'bar-container')
        .attr('transform', `translate(${margin.left},${margin.top})`);


      let xScale = d3.scale.ordinal();
      let yScale = d3.scale.linear();

      xScale
        .domain(data.map(function(d, i) { return i+1; }))
        .rangeRoundBands([0, _width], 0.05);

      yScale
        .domain([0, d3.max(data)])
        .range([_height, 0]);

      let bars = barContainer.selectAll('rect')
        .data(data);

      bars.enter().append('rect')
        .attr('x', function(d, i) { return xScale(i+1); })
        .attr('y', function(d){ return yScale(0); })
        .attr('height', 0)
        .attr('width', xScale.rangeBand())
        .attr('fill', color);

      bars.transition()
        .duration(750)
        .ease('sin')
        .attr('y',function(d,i) { return yScale(d); })
        .attr('height', function(d,i) { return _height - yScale(d); });

      bars.exit().remove();
    });
  }

  chart.width = function(value) {
    if(!arguments.length) { return value; }
    width = value;
    return chart;
  };

  chart.height = function(value) {
    if(!arguments.length) { return value; }
    height = value;
    return chart;
  };

  chart.margin = function(value) {
    if(!arguments.length) { return value; }
    if (typeof value === 'number') {
      value = {
        top: value,
        right: value,
        bottom: value,
        left: value
      };
    }

    margin = value;
    return chart;
  };

  chart.color = function(value) {
    if(!arguments.length) { return value; }
    color = value;
    return chart;
  };

  return chart;
}

export default BarChart;
