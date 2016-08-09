var margin = 50
var flameGraph = d3.flameGraph()
  // .height(window.innerHeight - margin * 2)
  .height(560)
  .width(window.innerWidth - margin * 2)
  .cellHeight(21)
  .transitionDuration(500)
  .transitionEase('cubic-in-out')
  .sort(true)
  .title("");

var tip = d3.tip()
  .direction("s")
  .offset([8, 0])
  .attr('class', 'd3-flame-graph-tip')
  .html(function(d) {
    return d.name + ": " + humanReadableBytes(d.value);
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

function humanReadableBytes (bytes) {
  if (bytes < 1024) {
    return bytes + 'B'
  }

  var sizeKB = Math.floor(bytes / 10.24) / 100
  if (sizeKB < 1024) {
    return sizeKB + 'KB'
  }

  var sizeMB = Math.floor(sizeKB / 10.24) / 100
  if (sizeMB < 1024) {
    return sizeMB + 'MB'
  }

  var sizeGB = Math.floor(sizeMB / 10.24) / 100
  return sizeGB + 'GB'
}
