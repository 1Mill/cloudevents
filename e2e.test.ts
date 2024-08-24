import { Cloudevent } from './dist/bundle-node/cloudevents.esm.js'

const cloudevent = new Cloudevent({
	data: { some: 'payload' },
	source: 'https://github.com/1mill/cloudevents',
	type: 'cmd.do-this-command.v0',
})

console.log(cloudevent)
// {
// 	actor: undefined,
// 	data: '{"some":"payload"}',
// 	datacontenttype: 'application/json',
// 	dataschema: undefined,
// 	id: 'SfDtqf84tpH13M6KTInWV',
// 	originid: 'SfDtqf84tpH13M6KTInWV',
// 	originsource: 'https://github.com/1mill/cloudevents',
// 	origintime: '2024-09-07T20:54:12.443Z',
// 	origintype: 'cmd.do-this-command.v0',
// 	source: 'https://github.com/1mill/cloudevents',
// 	specversion: '1.0',
// 	subject: undefined,
// 	time: '2024-09-07T20:54:12.443Z',
// 	type: 'cmd.do-this-command.v0',
// 	wschannelid: undefined,
// }

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
// {
// 	actor: 'user#1234',
// 	data: '{"new":"payload","value":true}',
// 	datacontenttype: 'application/json',
// 	dataschema: undefined,
// 	id: 'CapjTVlPqutsGk--fAKVz',
// 	originid: 'SfDtqf84tpH13M6KTInWV',
// 	originsource: 'https://github.com/1mill/cloudevents',
// 	origintime: '2024-09-07T20:54:12.443Z',
// 	origintype: 'cmd.do-this-command.v0',
// 	source: 'https://www.erikekberg.com/',
// 	specversion: '1.0',
// 	subject: 'project#4321',
// 	time: '2024-09-07T20:54:12.447Z',
// 	type: 'fct.this-thing-happened.v0',
// 	wschannelid: 'some-prefix:my-resource-name#id=12345',
// }
