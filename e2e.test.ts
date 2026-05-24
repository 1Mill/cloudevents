import { Cloudevent } from './dist/index.js'

const root = new Cloudevent({
	data: { some: 'payload' },
	source: 'https://github.com/1mill/cloudevents',
	type: 'cmd.do-this-command.v0',
})
console.log('root: ', root)
// root:  Cloudevent {
//   data: '{"some":"payload"}',
//   datacontenttype: 'application/json',
//   dataschema: undefined,
//   id: 'ce_019e5c0e-a05c-70f9-a0e9-1a96a6d385f7',
//   source: 'https://github.com/1mill/cloudevents',
//   specversion: '1.0',
//   subject: undefined,
//   time: '2026-05-24T22:15:22.973Z',
//   type: 'cmd.do-this-command.v0',
//   actor: undefined,
//   wschannelid: undefined,
//   parentid: undefined,
//   parentrootid: 'ce_019e5c0e-a05c-70f9-a0e9-1a96a6d385f7'
// }

const parent = new Cloudevent({
	data: { isparent: 'yes' },
	parent: root,
	source: 'https://github.com/1mill/cloudevents',
	type: 'cmd.do-this-parent-side-effect.v0',
})

console.log('parent: ', parent)
// parent:  Cloudevent {
//   data: '{"isparent":"yes"}',
//   datacontenttype: 'application/json',
//   dataschema: undefined,
//   id: 'ce_019e5c0e-a061-7129-8d9f-e66f48ff1968',
//   source: 'https://github.com/1mill/cloudevents',
//   specversion: '1.0',
//   subject: undefined,
//   time: '2026-05-24T22:15:22.977Z',
//   type: 'cmd.do-this-parent-side-effect.v0',
//   actor: undefined,
//   wschannelid: undefined,
//   parentid: 'ce_019e5c0e-a05c-70f9-a0e9-1a96a6d385f7',
//   parentrootid: 'ce_019e5c0e-a05c-70f9-a0e9-1a96a6d385f7'
// }

const cloudevent = new Cloudevent({
	actor: 'user#id=1234',
	data: { new: 'payload', value: true },
	parent,
	source: 'https://www.erikekberg.com/',
	subject: 'project#id=4321',
	type: 'fct.this-thing-happened.v0',
	wschannelid: 'some-prefix:my-resource-name#id=12345',
})
console.log('cloudevent: ', cloudevent)
// cloudevent:  Cloudevent {
//   data: '{"new":"payload","value":true}',
//   datacontenttype: 'application/json',
//   dataschema: undefined,
//   id: 'ce_019e5c0e-a061-7129-8d9f-e94a444712a0',
//   source: 'https://www.erikekberg.com/',
//   specversion: '1.0',
//   subject: 'project#id=4321',
//   time: '2026-05-24T22:15:22.977Z',
//   type: 'fct.this-thing-happened.v0',
//   actor: 'user#id=1234',
//   wschannelid: 'some-prefix:my-resource-name#id=12345',
//   parentid: 'ce_019e5c0e-a061-7129-8d9f-e66f48ff1968',
//   parentrootid: 'ce_019e5c0e-a05c-70f9-a0e9-1a96a6d385f7'
// }
