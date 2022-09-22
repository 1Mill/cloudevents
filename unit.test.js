// import { Cloudevent } from './dist/index.module.js'
import { Cloudevent } from './dist/index.cjs'

const cloudevent = new Cloudevent({
	data: JSON.stringify({ some: 'payload' }),
	source: 'https://github.com/1mill/cloudevents',
	type: 'cmd.do-this-command.v0',
	originactor: 'user:admin#id=1234',
})

console.log(cloudevent)
// {
//   id: 'v76ZvDVhbcCwD5M_NQ1FS',
//   source: 'https://github.com/1mill/cloudevents',
//   type: 'cmd.do-this-command.v0',
//   specversion: '1.0',
//   time: '2022-09-22T01:44:31.717Z',
//   data: '{"some":"payload"}',
//   datacontenttype: 'application/json',
//   dataschema: undefined,
//   subject: undefined,
//   originactor: 'user:admin#id=1234',
//   originid: 'v76ZvDVhbcCwD5M_NQ1FS',
//   originsource: 'https://github.com/1mill/cloudevents',
//   origintime: '2022-09-22T01:44:31.717Z',
//   origintype: 'cmd.do-this-command.v0',
//   originatorid: undefined,
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
//   id: '-RIl1_Dr_uNh6Q4Oa3Ifq',
//   source: 'https://www.erikekberg.com/',
//   type: 'fct.this-thing-happened.v0',
//   specversion: '1.0',
//   time: '2022-09-22T01:44:31.747Z',
//   data: '{"new":"payload","value":true}',
//   datacontenttype: 'application/json',
//   dataschema: undefined,
//   subject: undefined,
//   originactor: 'user:admin#id=1234',
//   originid: 'v76ZvDVhbcCwD5M_NQ1FS',
//   originsource: 'https://github.com/1mill/cloudevents',
//   origintime: '2022-09-22T01:44:31.717Z',
//   origintype: 'cmd.do-this-command.v0',
//   originatorid: undefined,
//   wschannelid: 'some-prefix:my-resource-name#id=12345'
// }
