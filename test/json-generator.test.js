import path from 'path'
import test from 'ava'
import jsonGenerator from '../lib/json-generator.js'

test(t => {
  const libFolder = path.join(__dirname, '../lib')
  const tree = jsonGenerator(libFolder)

  // basic info
  t.is(tree.name, path.basename(libFolder))
  t.is(typeof tree.value, 'number')
  t.true(tree.children instanceof Array)
  t.true(tree.children.length === 3)

  // meta info
  t.is(typeof tree.meta, 'object')
  t.is(typeof tree.meta.path, 'string')
  t.is(typeof tree.meta.count, 'number')
})
