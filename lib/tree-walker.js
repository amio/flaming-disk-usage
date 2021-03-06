const fs = require('fs')
const join = require('path').join

function treeWalkerSync (path, nodeFormater, depth) {
  'use strict' // for node 4

  if (depth === 0) return

  nodeFormater = nodeFormater || nodeFormaterDefault
  depth = depth || Infinity

  let stat
  try {
    stat = fs.statSync(path)
  } catch (e) {
    // console.log('fs.stat err:', path, e.code)
    return
  }

  const type = fsType(stat)
  const node = {
    path: path,
    type: type,
    stat: stat
  }

  if (stat.isDirectory()) {
    let children
    try {
      children = fs.readdirSync(path)
    } catch (e) {
      // console.log('readdir err:', path, e.code)
      return
    }

    if (children !== undefined) {
      node.children = children.map(function (child) {
        return treeWalkerSync(join(path, child), nodeFormater, depth - 1)
      }).filter(function (child) {
        return child !== undefined
      })
    }
  }

  return nodeFormater(node)
}

function nodeFormaterDefault (node) {
  return node
}

function fsType(stat) {
  if (stat.isFile()) return 'file'
  if (stat.isDirectory()) return 'directory'
  if (stat.isBlockDevice()) return 'block-device'
  if (stat.isCharacterDevice()) return 'character-device'
  if (stat.isFIFO()) return 'fifo'
  if (stat.isSocket()) return 'socket'
  return 'unknown'
}

module.exports = treeWalkerSync
