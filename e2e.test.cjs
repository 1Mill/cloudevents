const { Cloudevent } = require('./dist/bundle-node/cloudevents.cjs')

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
// 	id: 'ce_z08RP-H06c09gyrLLrIt3c_NYfHj1UDDY',
// 	originid: 'ce_z08RP-H06c09gyrLLrIt3c_NYfHj1UDDY',
// 	originsource: 'https://github.com/1mill/cloudevents',
// 	origintime: '2024-09-08T21:03:36.320Z',
// 	origintype: 'cmd.do-this-command.v0',
// 	source: 'https://github.com/1mill/cloudevents',
// 	specversion: '1.0',
// 	subject: undefined,
// 	time: '2024-09-08T21:03:36.320Z',
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
// 	id: 'ce_0xy5S_hip8nHwNoLuec1Zmdc1hMzDMDuf',
// 	originid: 'ce_z08RP-H06c09gyrLLrIt3c_NYfHj1UDDY',
// 	originsource: 'https://github.com/1mill/cloudevents',
// 	origintime: '2024-09-08T21:03:36.320Z',
// 	origintype: 'cmd.do-this-command.v0',
// 	source: 'https://www.erikekberg.com/',
// 	specversion: '1.0',
// 	subject: 'project#4321',
// 	time: '2024-09-08T21:03:36.324Z',
// 	type: 'fct.this-thing-happened.v0',
// 	wschannelid: 'some-prefix:my-resource-name#id=12345',
// }
