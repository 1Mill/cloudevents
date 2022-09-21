// import { Cloudevent } from './dist/index.module.js'
import { Cloudevent } from './dist/index.cjs'

const cloudevent = new Cloudevent({
	data: JSON.stringify({ some: 'payload' }),
	source: 'https://github.com/1mill/cloudevents',
	type: 'cmd.do-this-command.v0',
}).originator({ originatorid: 'user.id.1234' })

console.log(cloudevent)
// {
//   id: 'g-wea_sYvxmvsGeL3YCSM',
//   source: 'https://github.com/1mill/cloudevents',
//   type: 'cmd.do-this-command.v0',
//   specversion: '1.0',
//   time: '2022-09-21T04:27:10.729Z',
//   data: '{"some":"payload"}',
//   datacontenttype: 'application/json',
//   dataschema: undefined,
//   subject: undefined,
//   originid: 'g-wea_sYvxmvsGeL3YCSM',
//   originsource: 'https://github.com/1mill/cloudevents',
//   origintime: '2022-09-21T04:27:10.729Z',
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
.originator({ cloudevent })
.wschannel({ wschannelid: 'some-prefix:my-resource-name#id=12345' })

console.log(enrichedCloudevent)
// {
//   id: 'zojPIW1eMm_JsvQI5VnfR',
//   source: 'https://www.erikekberg.com/',
//   type: 'fct.this-thing-happened.v0',
//   specversion: '1.0',
//   time: '2022-09-21T04:27:10.740Z',
//   data: '{"new":"payload","value":true}',
//   datacontenttype: 'application/json',
//   dataschema: undefined,
//   subject: undefined,
//   originid: 'g-wea_sYvxmvsGeL3YCSM',
//   originsource: 'https://github.com/1mill/cloudevents',
//   origintime: '2022-09-21T04:27:10.729Z',
//   origintype: 'cmd.do-this-command.v0',
//   originatorid: 'user.id.1234',
//   wschannelid: 'some-prefix:my-resource-name#id=12345'
// }
