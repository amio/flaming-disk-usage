const path = require('path')
const treeWalker = require('./tree-walker.js')

function generateTreeJSON(dir) {
  const treeJSON = treeWalker(dir, function (node) {
    const diskUsage = node.children ? node.children.reduce(function (prev, curr) {
      return prev + curr.value
    }, 0) : node.stat.blocks * DISK_BLOCK_SIZE
    return {
      path: node.path,
      name: path.basename(node.path),
      value: diskUsage,
      children: node.children
    }
  })

  return treeJSON
}

// see: http://wiki.linuxquestions.org/wiki/Block_devices_and_block_sizes
const DISK_BLOCK_SIZE = 512

function countDiskUsage (walkerNode) {
  if (walkerNode.children === undefined) {
    return walkerNode.stat.blocks * DISK_BLOCK_SIZE
  } else {
    return walkerNode.children.reduce(function (prev, curr) {
      return prev + curr.value
    }, 0)
  }
}

module.exports = generateTreeJSON
