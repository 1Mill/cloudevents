# @1mill/cloudevents

## Introduction

This is an implementation and extention of the [CloudEvents v1 specification](https://github.com/cloudevents/spec) to easily build cloudevents with origin history.

## Install

```html
<script src="https://unpkg.com/@1mill/cloudevents@5/dist/index.umd.js">
```

or

```bash
npm install @1mill/cloudevents
```

```node
// const { Cloudevent } = require('@1mill/cloudevents') // CommonJs
import { Cloudevent } from '@1mill/cloudevents' // EMS

const cloudevent = new Cloudevent({
  data: { some: 'payload' },
  source: 'https://github.com/1mill/cloudevents',
  type: 'cmd.do-this-command.v0',
})

console.log(cloudevent)
// {
//  actor: undefined,
//  data: '{"some":"payload"}',
//  datacontenttype: 'application/json',
//  dataschema: undefined,
//  id: 'ce_z08RP-H06c09gyrLLrIt3c_NYfHj1UDDY',
//  originid: 'ce_z08RP-H06c09gyrLLrIt3c_NYfHj1UDDY',
//  originsource: 'https://github.com/1mill/cloudevents',
//  origintime: '2024-09-08T21:03:36.320Z',
//  origintype: 'cmd.do-this-command.v0',
//  source: 'https://github.com/1mill/cloudevents',
//  specversion: '1.0',
//  subject: undefined,
//  time: '2024-09-08T21:03:36.320Z',
//  type: 'cmd.do-this-command.v0',
//  wschannelid: undefined,
// }

const enrichedCloudevent = new Cloudevent({
  actor: 'user#1234',
  data: { new: 'payload', value: true },
  origin: cloudevent,
  source: 'https://www.erikekberg.com/',
  subject: 'project#4321',
  type: 'fct.this-thing-happened.v0',
  wschannelid: 'some-prefix:my-resource-name#id=12345',
})

console.log(enrichedCloudevent)
// {
//  actor: 'user#1234',
//  data: '{"new":"payload","value":true}',
//  datacontenttype: 'application/json',
//  dataschema: undefined,
//  id: 'ce_0xy5S_hip8nHwNoLuec1Zmdc1hMzDMDuf',
//  originid: 'ce_z08RP-H06c09gyrLLrIt3c_NYfHj1UDDY',
//  originsource: 'https://github.com/1mill/cloudevents',
//  origintime: '2024-09-08T21:03:36.320Z',
//  origintype: 'cmd.do-this-command.v0',
//  source: 'https://www.erikekberg.com/',
//  specversion: '1.0',
//  subject: 'project#4321',
//  time: '2024-09-08T21:03:36.324Z',
//  type: 'fct.this-thing-happened.v0',
//  wschannelid: 'some-prefix:my-resource-name#id=12345',
// }
```

## Props

| Props            | Required  | Type        | Default                               | Notes                                                                                       |
|----------------- |---------- |------------ |-------------------------------------- |-------------------------------------------------------------------------------------------- |
| actor            |           | String      |                                       |                                                                                             |
| data             |           | Any         |                                       |                                                                                             |
| datacontenttype  |           | String      |                                       | If `data` is present, then defaults to `"application/json"` unless otherwise specified      |
| dataschema       |           | String      |                                       |                                                                                             |
| origin           |           | Cloudevent  |                                       | Helper to set `originid`, `originsource`, `origintype`, and `origintime` attributes         |
| source           | yes       | String      | `process.env.MILL_CLOUDEVENTS_SOURCE` | Recommended to use universal identifiers (e.g. <https://my-domain.com/my/feature/path/123>) |
| specversion      |           | String      | `1.0`                                 | Cloudevent specification version                                                            |
| subject          |           | String      |                                       |                                                                                             |
| type             | yes       | String      |                                       |                                                                                             |
| wschannelid      |           | String      |                                       |                                                                                             |

## Release new version

1. Create `.env` and add `NPM_TOKEN=...`
2. Run `docker compose run node`
3. In the container, run `npm version <major|minor|patch>`
4. In the container, run `npm run deploy`
