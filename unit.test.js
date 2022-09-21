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
//   id: 'tEzBztYRlPAaGY3uWIVWI',
//   source: 'https://github.com/1mill/cloudevents',
//   type: 'cmd.do-this-command.v0',
//   specversion: '1.0',
//   time: '2022-09-21T03:58:36.995Z',
//   data: '{"some":"payload"}',
//   datacontenttype: 'application/json',
//   dataschema: undefined,
//   subject: undefined,
//   originid: 'tEzBztYRlPAaGY3uWIVWI',
//   originsource: 'https://github.com/1mill/cloudevents',
//   origintime: '2022-09-21T03:58:36.995Z',
//   origintype: 'cmd.do-this-command.v0',
//   originatorid: 'user.id.1234',
//   wschannelid: undefined
// }

const enrichedCloudevent = new Cloudevent({
	data: JSON.stringify({ new: 'payload', value: true }),
	source: 'https://www.erikekberg.com/',
	type: 'fct.this-thing-happened.v0',
})
.origin({ cloudevent })
.wschannel({ wschannelid: 'some-prefix:my-resource-name#id=12345' })

console.log(enrichedCloudevent)
// {
//   id: '4_7YyYMjm-YPE3f20B1Ow',
//   source: 'https://www.erikekberg.com/',
//   type: 'fct.this-thing-happened.v0',
//   specversion: '1.0',
//   time: '2022-09-21T03:58:37.005Z',
//   data: '{"new":"payload","value":true}',
//   datacontenttype: 'application/json',
//   dataschema: undefined,
//   subject: undefined,
//   originid: 'tEzBztYRlPAaGY3uWIVWI',
//   originsource: 'https://github.com/1mill/cloudevents',
//   origintime: '2022-09-21T03:58:36.995Z',
//   origintype: 'cmd.do-this-command.v0',
//   originatorid: undefined,
//   wschannelid: 'some-prefix:my-resource-name#id=12345'
// }
