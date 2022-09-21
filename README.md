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
| originid         |           | String  | "id" property                        | "id" property is internally generated as part of the package                              |
| originsource     |           | String  | "source" property                    |                                                                                           |
| origintime       |           | String  | "time" property                      | "time" property is internally generated as part of the package                            |
| origintype       |           | String  | "type" property                      |                                                                                           |
| originatorid     |           | String  |                                      |                                                                                           |
| wschannelid      |           | String  |                                      |                                                                                           |

### origin

Add `origin` attributes to a Cloudevent manually

```node
const cloudevent = new Cloudevent({
  source: 'my-source',
  type: 'my-type',
})
.origin({
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
  type: 'cmd.say-hello.v0'
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
