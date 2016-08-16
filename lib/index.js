const fs = require('fs')
const path = require('path')
const generateTreeJSON = require('./generate-tree-json.js')
const opn = require('opn')

const argv = require('minimist')(process.argv.slice(2))
const dir = argv._[0] || process.cwd()
const treeJSON = generateTreeJSON(dir)

// Write to data js
const treeFlameDataJS = `
  window.treedir = '${path.resolve(dir)}';
  window.treedata = ${JSON.stringify(treeJSON)};
`
fs.writeFileSync(
  path.join(__dirname, '../tree-flame-data.js'),
  treeFlameDataJS
)

// Open flame graph html
opn(path.join(__dirname, '../tree-flame.html'), { wait: false })
