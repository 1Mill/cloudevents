import { Cloudevent } from './dist/bundle-node/cloudevents.esm.js'

const cloudevent = new Cloudevent({
	data: { some: 'payload' },
	source: 'https://github.com/1mill/cloudevents',
	type: 'cmd.do-this-command.v0',
})

console.log(cloudevent)

const enrichedCloudevent = new Cloudevent({
	actor: 'user#1234',
	data: { new: 'payload', value: true },
	origin: cloudevent,
	source: 'https://www.erikekberg.com/',
	subject: 'project#4321',
	type: 'fct.this-thing-happened.v0',
	wschannelid: 'some-prefix:my-resource-name#id=12345',
})

console.log(enrichedCloudevent)
