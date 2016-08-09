var margin = 50
var flameGraph = d3.flameGraph()
  // .height(window.innerHeight - margin * 2)
  .height(560)
  .width(window.innerWidth - margin * 2)
  .cellHeight(22)
  .transitionDuration(500)
  .transitionEase('cubic-in-out')
  .sort(true)
  .title("");

var tip = d3.tip()
  .direction("s")
  .offset([8, 0])
  .attr('class', 'd3-flame-graph-tip')
  .html(function(d) {
    var sizeKB = Math.floor(d.value / 1024)
    var size = sizeKB > 1024 ? Math.floor(sizeKB / 10.24) / 100 + 'MB' : sizeKB + 'KB'
    return d.name + ": " + size;
  });

flameGraph.tooltip(tip);

function render () {
  d3.select("#chart")
    .html('')
    .datum(window.treedata)
    .call(flameGraph);
  d3.select('#chart-label')
    .html(window.treedir)
}

render();
