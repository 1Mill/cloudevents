# @1mill/cloudevents

## Introduction

This is an implementation and extention of the [CloudEvents v1 specification](https://github.com/cloudevents/spec) to easily build cloudevents with origin history.

## Install

```html
<script src="https://unpkg.com/@1mill/cloudevents@4/dist/index.umd.js">
```

or

```bash
npm install @1mill/cloudevents
```

```node
const { Cloudevent } = require('@1mill/cloudevents') // CommonJs
import { Cloudevent } from '@1mill/cloudevents' // EMS

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
```

| Attribute        | Required  | Type    | Default                              | Notes                                                                                     |
|----------------- |---------- |-------- |------------------------------------- |------------------------------------------------------------------------------------------ |
| data             |           | Any     |                                      |                                                                                           |
| datacontenttype  |           | String  |                                      | If "data" is present, defaults to "application/json" unless specified otherwise           |
| dataschema       |           | String  |                                      |                                                                                           |
| source           | yes       | String  | process.env.MILL_CLOUDEVENTS_SOURCE  | Recommended to use universal identifier (e.g. <https://my-domain.com/my/feature/path/123>)|
| specversion      |           | String  | 1.0                                  | Cloudevent specification version                                                          |
| subject          |           | String  |                                      |                                                                                           |
| type             | yes       | String  |                                      |                                                                                           |
| originactor      |           | String  |                                      |                                                                                           |
| originid         |           | String  | "id" property                        | "id" property is internally generated as part of the package                              |
| originsource     |           | String  | "source" property                    |                                                                                           |
| origintime       |           | String  | "time" property                      | "time" property is internally generated as part of the package                            |
| origintype       |           | String  | "type" property                      |                                                                                           |
| originatorid     |           | String  |                                      | Depricated in favor of "originactor"                                                      |
| wschannelid      |           | String  |                                      |                                                                                           |

### origin

Add `origin` attributes to a Cloudevent manually

```node
const cloudevent = new Cloudevent({
  source: 'my-source',
  type: 'my-type',
})
.origin({
  originactor: 'my-origin-actor',
  originid: 'my-origin-id',
  originsource: 'my-origin-source',
  origintime: 'my-origin-time',
  origintype: 'my-origin-type',
})
```

or populate them automatically by passing in an existing Cloudevent

```node
const originCloudevent = new Cloudevent({
  source: 'my-origin-cloudevent',
  type: 'cmd.say-hello.v0',
  originactor: 'my-origin-actor',
})

const cloudevent = new Cloudevent({
  data: JSON.stringify({ message: 'Hello world!' }),
  source: 'my-enrichment-service',
  type: 'fct.said-hello.v0',
}).origin({ cloudevent: originCloudevent })
```

### wschannel

Add `wschannel` attributes to a Cloudevent manually

```node
const cloudevent = new Cloudevent({
    source: 'my-source',
    type: 'my-type',
  })
  .wschannel({ wschannelid: 'my-unique-channel-name })
```

or populate them automatically by passing in an existing Cloudevent

```node
const originCloudevent = new Cloudevent({
  source: 'my-origin-cloudevent',
  type: 'cmd.say-hello.v0'
})
.wschannel({ wschannelid: 'my-unique-channel-name })

const cloudevent = new Cloudevent({
  data: JSON.stringify({ message: 'Hello world!' }),
  source: 'my-enrichment-service',
  type: 'fct.said-hello.v0',
}).wschannel({ cloudevent: originCloudevent })
```

## Release new version

```bash
npm version <major|minor|patch>
npm run depoy
```
