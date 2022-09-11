// import { Cloudevent } from './dist/index.module.js'
import { Cloudevent } from './dist/index.cjs'

const originCloudevent = new Cloudevent({
	data: JSON.stringify({ some: 'payload' }),
	source: 'https://github.com/1mill/cloudevents',
	type: 'cmd.do-this-command.v0',
	originatorid: 'user.id.1234',
})
console.log(originCloudevent)
// {
//   id: 'f_2R8OyOtfYW4YPs2SOdv',
//   source: 'https://github.com/1mill/cloudevents',
//   type: 'cmd.do-this-command.v0',
//   specversion: '1.0',
//   time: '2022-09-16T03:47:47.310Z',
//   data: '{"some":"payload"}',
//   datacontenttype: 'application/json',
//   dataschema: undefined,
//   subject: undefined,
//   origintime: '2022-09-16T03:47:47.310Z',
//   originid: 'f_2R8OyOtfYW4YPs2SOdv',
//   originsource: 'https://github.com/1mill/cloudevents',
//   origintype: 'cmd.do-this-command.v0',
//   originatorid: 'user.id.1234'
// }

const enrichedCloudevent = new Cloudevent({
	...originCloudevent,
	data: JSON.stringify({ new: 'payload', value: true }),
	source: 'https://www.erikekberg.com/',
	type: 'fct.this-thing-happened.v0',
})
console.log(enrichedCloudevent)
// {
//   id: 'mux85XsamwvGkDFgeElQy',
//   source: 'https://www.erikekberg.com/',
//   type: 'fct.this-thing-happened.v0',
//   specversion: '1.0',
//   time: '2022-09-16T03:47:47.320Z',
//   data: '{"new":"payload","value":true}',
//   datacontenttype: 'application/json',
//   dataschema: undefined,
//   subject: undefined,
//   origintime: '2022-09-16T03:47:47.310Z',
//   originid: 'f_2R8OyOtfYW4YPs2SOdv',
//   originsource: 'https://github.com/1mill/cloudevents',
//   origintype: 'cmd.do-this-command.v0',
//   originatorid: 'user.id.1234'
// }
