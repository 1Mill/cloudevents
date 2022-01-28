// import { Cloudevent } from './dist/index.module.js'
import { Cloudevent } from './dist/index.cjs'

const ce1 = new Cloudevent({ source: 'aaa', type: 'bbb', data: JSON.stringify({ hello: 'world' }) })
console.log(ce1)

const ce2 = new Cloudevent({ ...ce1, source: 'new source', type: 'new-type', data: JSON.stringify({ new: 'text' }) })
console.log(ce2)
