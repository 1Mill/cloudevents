# @1mill/cloudevents

## Introduction

This is an implementation and extention of the [CloudEvents v1 specification](https://github.com/cloudevents/spec) to easily build cloudevents with origin history.

## Install

```html
<script src="https://unpkg.com/@1mill/cloudevents@4.1.1/dist/index.umd.js">
```

or

```bash
npm install @1mill/cloudevents@^4
```

```node
const { Cloudevent } = require('@1mill/cloudevents') // CommonJs
import { Cloudevent } from '@1mill/cloudevents' // EMS

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
```

|                  | Required  | Type    | Default                              | Notes                                                                                     |
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

## Release new version

```bash
npm version <major|minor|patch>
npm run depoy
```
