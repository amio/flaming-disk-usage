const fs = require('fs')
const path = require('path')
const tree = require('directory-tree')
const opn = require('opn')

const argv = require('minimist')(process.argv.slice(2))
const dir = argv._[0] || process.cwd()

const treeJSONString = JSON.stringify(tree(dir))
const transformedTreeJSON = JSON.parse(treeJSONString, function (k, v) {
  switch (k) {
    case 'path':
      return v.replace(dir, '')
    case 'size':
      this.value = this.value || this.size
      return v
    case 'children':
      this.value = countSize(this)
      console.log(this.path, this.value, this.size)
      return v
    default:
      return v
  }
})

// Recursively count target's children's size.
function countSize (target) {
  if (target.children) {
    return target.children.reduce((prev, curr) => {
      return prev + countSize(curr)
    }, 0)
  } else {
    return target.size
  }
}

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
opn(path.join(__dirname, 'tree-flame.html'), { wait: false })
