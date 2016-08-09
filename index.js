const fs = require('fs')
const path = require('path')
const tree = require('directory-tree')
const parseArgs = require('minimist')
const opn = require('opn')

const argv = parseArgs(process.argv.slice(2))
const dir = argv._[0] || process.cwd()

const treeJSON = tree(dir)
const transformedTreeJSON = JSON.parse(JSON.stringify(treeJSON), function (k, v) {
  switch (k) {
    case 'path':
      return v.replace(dir, '')
    case 'size':
      this.value = this.value || this.size
      return v
    case 'children':
      this.value = this.children.reduce(function (prev, curr) {
        return prev + curr.size
      }, this.size)
      return v
    default:
      return v
  }
})

// Write to data js
const treeFlameDataJS = `
  window.treedir = '${path.resolve(dir)}';
  window.treedata = ${JSON.stringify(transformedTreeJSON)};
`
fs.writeFileSync(
  path.join(__dirname, 'tree-flame-data.js'),
  treeFlameDataJS
)

// Open flame graph html
opn(path.join(__dirname, 'tree-flame.html'))
process.exit()
