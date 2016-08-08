const fs = require('fs')
const path = require('path')
const tree = require('directory-tree')
const parseArgs = require('minimist')

const argv = parseArgs(process.argv.slice(2))
const dir = argv._[0] || process.cwd()

const treeJSON = tree(dir)
const transformedTreeJSON = JSON.parse(JSON.stringify(treeJSON), function (k, v) {
  switch (k) {
    case 'path':
      return v.replace(dir, '')
    case 'size':
      this.value = v
      return
    default:
      return v
  }
})

treeJSON.name = transformedTreeJSON.name = path.resolve(dir)

// console.log(treeJSON)
// console.log(transformedTreeJSON)

fs.writeFileSync('treedata-map.json', JSON.stringify(treeJSON, null, 2))
fs.writeFileSync('treedata-flame.json', JSON.stringify(transformedTreeJSON, null, 2))
