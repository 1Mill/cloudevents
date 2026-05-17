import { Cloudevent } from './dist/index.js'

const root = new Cloudevent({
	data: { some: 'payload' },
	source: 'https://github.com/1mill/cloudevents',
	type: 'cmd.do-this-command.v0',
})
console.log('root: ', root)

const parent = new Cloudevent({
	data: { isparent: 'yes' },
	parent: root,
	source: 'https://github.com/1mill/cloudevents',
	type: 'cmd.do-this-parent-side-effect.v0',
})

console.log('parent: ', parent)

const cloudevent = new Cloudevent({
	actor: 'user#1234',
	data: { new: 'payload', value: true },
	parent,
	source: 'https://www.erikekberg.com/',
	subject: 'project#4321',
	type: 'fct.this-thing-happened.v0',
	wschannelid: 'some-prefix:my-resource-name#id=12345',
})
console.log('cloudevent: ', cloudevent)
