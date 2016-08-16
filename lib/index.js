const fs = require('fs')
const path = require('path')
const generateTreeJSON = require('./generate-tree-json.js')
const opn = require('opn')

function inspectDiskUsage (dir) {
  const treeJSON = generateTreeJSON(dir)

  // Write to data js
  const treeFlameDataJS = `
    window.treedir = '${path.resolve(dir)}';
    window.treetotal = '${treeJSON.value}';
    window.treedata = ${JSON.stringify(treeJSON)};
  `
  fs.writeFileSync(
    path.join(__dirname, '../tree-flame-data.js'),
    treeFlameDataJS
  )

  // Open flame graph html
  opn(path.join(__dirname, '../tree-flame.html'), { wait: false })
}

module.exports = inspectDiskUsage
