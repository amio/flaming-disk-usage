const fs = require('fs')
const path = require('path')
const jsonGenerator = require('./json-generator.js')
const opn = require('opn')

function inspectDiskUsage (dir) {
  const treeJSON = jsonGenerator(dir)

  // Write to data js
  fs.writeFileSync(
    path.join(__dirname, '../inspect-flame-data.js'),
    `window.dataJSON = ${JSON.stringify(treeJSON)};`
  )

  console.log(treeJSON.meta.count + ' dirs & files.')

  // Open flame graph html
  opn(path.join(__dirname, '../inspect-flame.html'), { wait: false })
}

module.exports = inspectDiskUsage
