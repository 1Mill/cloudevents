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
```

| Attribute        | Required  | Type    | Default                              | Notes                                                                                     |
|----------------- |---------- |-------- |------------------------------------- |------------------------------------------------------------------------------------------ |
| data             |           | Any     |                                      |                                                                                           |
| datacontenttype  |           | String  |                                      | If "data" is present, defaults to "application/json" unless specified otherwise           |
| dataschema       |           | String  |                                      |                                                                                           |
| source           | yes       | String  | process.env.MILL_CLOUDEVENTS_SOURCE  | Recommended to use universal identifier (e.g. <https://my-domain.com/my/feature/path/123>)|
| specversion      | yes       | String  | 1.0                                  | Cloudevent specification version                                                          |
| subject          |           | String  |                                      |                                                                                           |
| type             | yes       | String  |                                      |                                                                                           |
| originid         | yes       | String  | "id" property                        | "id" property is internally generated as part of the package                              |
| originsource     | yes       | String  | "source" property                    |                                                                                           |
| origintime       | yes       | String  | "time" property                      | "time" property is internally generated as part of the package                            |
| origintype       | yes       | String  | "type" property                      |                                                                                           |
| originatorid     |           | String  |                                      |                                                                                           |
| wschannelid      |           | String  |                                      |                                                                                           |

### origin

Add origin attributes to a Cloudevent manually

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

## Release new version

```bash
npm version <major|minor|patch>
npm run depoy
```
