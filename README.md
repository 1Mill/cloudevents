# @1mill/cloudevents

## Introduction

This is an implementation and extention of the [CloudEvents v1 specification](https://github.com/cloudevents/spec) to easily build cloudevents with root history.

## Install

```html
<script src="https://unpkg.com/@1mill/cloudevents@7/dist/index.umd.js">
```

or

```bash
npm install @1mill/cloudevents
```

```node
import { Cloudevent } from '@1mill/cloudevents'

const root = new Cloudevent({
  data: { some: 'payload' },
  source: 'https://github.com/1mill/cloudevents',
  type: 'cmd.do-this-command.v0',
})
console.log('root: ', root)
// root:  Cloudevent {
//   data: '{"some":"payload"}',
//   datacontenttype: 'application/json',
//   dataschema: undefined,
//   id: 'ce_019e5c0e-a05c-70f9-a0e9-1a96a6d385f7',
//   source: 'https://github.com/1mill/cloudevents',
//   specversion: '1.0',
//   subject: undefined,
//   time: '2026-05-24T22:15:22.973Z',
//   type: 'cmd.do-this-command.v0',
//   actor: undefined,
//   wschannelid: undefined,
//   parentid: undefined,
//   parentrootid: 'ce_019e5c0e-a05c-70f9-a0e9-1a96a6d385f7'
// }

const parent = new Cloudevent({
  data: { isparent: 'yes' },
  parent: root,
  source: 'https://github.com/1mill/cloudevents',
  type: 'cmd.do-this-parent-side-effect.v0',
})

console.log('parent: ', parent)
// parent:  Cloudevent {
//   data: '{"isparent":"yes"}',
//   datacontenttype: 'application/json',
//   dataschema: undefined,
//   id: 'ce_019e5c0e-a061-7129-8d9f-e66f48ff1968',
//   source: 'https://github.com/1mill/cloudevents',
//   specversion: '1.0',
//   subject: undefined,
//   time: '2026-05-24T22:15:22.977Z',
//   type: 'cmd.do-this-parent-side-effect.v0',
//   actor: undefined,
//   wschannelid: undefined,
//   parentid: 'ce_019e5c0e-a05c-70f9-a0e9-1a96a6d385f7',
//   parentrootid: 'ce_019e5c0e-a05c-70f9-a0e9-1a96a6d385f7'
// }

const cloudevent = new Cloudevent({
  actor: 'user#id=1234',
  data: { new: 'payload', value: true },
  parent,
  source: 'https://www.erikekberg.com/',
  subject: 'project#id=4321',
  type: 'fct.this-thing-happened.v0',
  wschannelid: 'some-prefix:my-resource-name#id=12345',
})
console.log('cloudevent: ', cloudevent)
// cloudevent:  Cloudevent {
//   data: '{"new":"payload","value":true}',
//   datacontenttype: 'application/json',
//   dataschema: undefined,
//   id: 'ce_019e5c0e-a061-7129-8d9f-e94a444712a0',
//   source: 'https://www.erikekberg.com/',
//   specversion: '1.0',
//   subject: 'project#id=4321',
//   time: '2026-05-24T22:15:22.977Z',
//   type: 'fct.this-thing-happened.v0',
//   actor: 'user#id=1234',
//   wschannelid: 'some-prefix:my-resource-name#id=12345',
//   parentid: 'ce_019e5c0e-a061-7129-8d9f-e66f48ff1968',
//   parentrootid: 'ce_019e5c0e-a05c-70f9-a0e9-1a96a6d385f7'
// }
```

## Props

The `Cloudevent` class represents a fully-hydrated CloudEvent instance. Internally-generated metadata such as `id`, `time`, `parentid`, and `parentrootid` are automatically generated or derived at runtime, while constructor props provide a smaller ergonomic input shape for creating events.

| Field           | Required | Type         | Default                               | Description                                                                                                                     |
| --------------- | -------- | ------------ | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| actor           |          | `string`     |                                       | Metadata describing the originating actor (e.g. `user@id#1234`, `team#payments@service#billing`)                                |
| data            |          | `unknown`    |                                       | Event payload data                                                                                                              |
| datacontenttype |          | `string`     | `"application/json"`                  | Content type of `data` which defaults to `"application/json"` when `data` is present unless manually overriden.                 |
| dataschema      |          | `string`     |                                       | URI identifying the schema for the event payload                                                                                |
| id              |          | `string`     | Auto-generated UUIDv7                 | Unique CloudEvent identifier generated internally                                                                               |
| parentid        |          | `string`     | Derived from `parent.id`              | Identifier of the immediate parent event                                                                                        |
| parentrootid    |          | `string`     | `parent.parentrootid` or self `id`    | Root identifier for an entire event chain                                                                                       |
| source          | yes      | `string`     | `process.env.MILL_CLOUDEVENTS_SOURCE` | Event producer identifier. Recommended to use stable universal identifiers (e.g. `<https://my-domain.com/my/feature/path/123>`) |
| specversion     |          | `string`     | `"1.0"`                               | CloudEvents specification version                                                                                               |
| subject         |          | `string`     |                                       | Subject or sub-resource associated with the event                                                                               |
| time            |          | `string`     | Auto-generated ISO timestamp          | Timestamp generated when the event instance is created                                                                          |
| type            | yes      | `string`     |                                       | Event type identifier                                                                                                           |
| wschannelid     |          | `string`     |                                       | WebSocket channel identifier in which the event should be send to                                                               |
| ---             | ---      | ---          | ---                                   | ---                                                                                                                             |
| parent          |          | `Cloudevent` |                                       | Helper used to automatically derive `parentid` and `parentrootid`                                                               |

## Release new version

1. Create `.env` and add `NPM_TOKEN=...`
2. Run `docker compose run node`
3. In the container, run `npm version <major|minor|patch>`
4. In the container, run `npm run deploy`
