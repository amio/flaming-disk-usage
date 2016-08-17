
window.onload = render
window.onresize = render

function render () {
  var datasource = window.dataJson
  var margin = 50
  var graph = configGraph()
    .height(560)
    .width(window.innerWidth - margin * 2)

  // Paint main graph
  d3.select("#chart")
    .html('')
    .datum(datasource)
    .call(graph);

  // Output meta info
  var totalSize = humanReadableBytes(datasource.value)
  d3.select('#chart-label')
    .text(datasource.meta.path + ' - ' + totalSize)
}

function configGraph () {
  var flameGraph = d3.flameGraph()
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

  return flameGraph
}

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
