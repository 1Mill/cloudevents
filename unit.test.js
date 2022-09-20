// import { Cloudevent } from './dist/index.module.js'
import { Cloudevent } from './dist/index.cjs'

const cloudevent = new Cloudevent({
	data: JSON.stringify({ some: 'payload' }),
	source: 'https://github.com/1mill/cloudevents',
	type: 'cmd.do-this-command.v0',
	originatorid: 'user.id.1234',
})
console.log(cloudevent)
// {
//   id: '4qoAmUHbusWSZh3H9sCYa',
//   source: 'https://github.com/1mill/cloudevents',
//   type: 'cmd.do-this-command.v0',
//   specversion: '1.0',
//   time: '2022-09-20T23:29:50.419Z',
//   data: '{"some":"payload"}',
//   datacontenttype: 'application/json',
//   dataschema: undefined,
//   subject: undefined,
//   originid: '4qoAmUHbusWSZh3H9sCYa',
//   originsource: 'https://github.com/1mill/cloudevents',
//   origintime: '2022-09-20T23:29:50.419Z',
//   origintype: 'cmd.do-this-command.v0',
//   originatorid: 'user.id.1234',
//   wschannelid: undefined
// }

const enrichedCloudevent = new Cloudevent({
	data: JSON.stringify({ new: 'payload', value: true }),
	source: 'https://www.erikekberg.com/',
	type: 'fct.this-thing-happened.v0',
}).origin({ cloudevent })
console.log(enrichedCloudevent)
// {
//   id: 'piMl7GmKgY41dDew8_9OK',
//   source: 'https://www.erikekberg.com/',
//   type: 'fct.this-thing-happened.v0',
//   specversion: '1.0',
//   time: '2022-09-20T23:29:50.427Z',
//   data: '{"new":"payload","value":true}',
//   datacontenttype: 'application/json',
//   dataschema: undefined,
//   subject: undefined,
//   originid: '4qoAmUHbusWSZh3H9sCYa',
//   originsource: 'https://github.com/1mill/cloudevents',
//   origintime: '2022-09-20T23:29:50.419Z',
//   origintype: 'cmd.do-this-command.v0',
//   originatorid: undefined,
//   wschannelid: undefined
// }
