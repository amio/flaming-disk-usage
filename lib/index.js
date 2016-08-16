const fs = require('fs')
const path = require('path')
const jsonGenerator = require('./json-generator.js')
const opn = require('opn')

function inspectDiskUsage (dir) {
  const treeJSON = jsonGenerator(dir)

  // Write to data js
  fs.writeFileSync(
    path.join(__dirname, '../tree-flame-data.js'),
    `window.treejson = ${JSON.stringify(treeJSON)};`
  )

  // Open flame graph html
  opn(path.join(__dirname, '../tree-flame.html'), { wait: false })
}

module.exports = inspectDiskUsage
