# @1mill/cloudevents

## Introduction

This is an implementation and extention of the CloudEvents v1 specification to easily build cloudevents.

```bash
npm install @1mill/cloudevents@^2
```

```js
const { Cloudevent } = require('@1mill/cloudevents')

const cloudevent = new Cloudevent({
  data: JSON.stringify({
    someAttribute: 'yes',
    someOtherAttribute: { thing: true },
  }),
  source: 'https://www.my-website.com/my/page/123', // * Required
  subject: '123',
  type: 'cmd.do-this-command.v0', // * Required
})

console.log(cloudevent)
// Cloudevent {
//   id: '-of0T1jfpvD7_lOXtynbb',
//   source: 'https://www.my-website.come/my/page/123',
//   type: 'cmd.do-this-command.v0',
//   specversion: '1.0',
//   data: '{"someAttribute":"yes","someOtherAttribute":{"thing":true}}',
//   datacontenttype: 'application/json',
//   dataschema: undefined,
//   subject: '123',
//   time: '2021-09-06T16:29:26.527Z',
//   origintime: '2021-09-06T16:29:26.527Z',
//   originid: '-of0T1jfpvD7_lOXtynbb',
//   originsource: 'https://www.my-website.come/my/page/123',
//   origintype: 'cmd.do-this-command.v0'
// }

const enrichment = payloadFromMyBusinessProcess()
const myReactionCloudevent = new Cloudevent({
  ...cloudevent,
  data: JSON.stringify(enrichment),
  source: 'arn:aws:lambda:us-east-1:123456789012:function:my-function',
  type: 'fct.this-thing-happened.v0',
})

console.log(myReactionCloudevent)
// Cloudevent {
//   id: 'N02yLAd_bZeZLGRUl78AS',
//   source: 'arn:aws:lambda:us-east-1:123456789012:function:my-function',
//   type: 'fct.this-thing-happened.v0',
//   specversion: '1.0',
//   data: '{...}',
//   datacontenttype: 'application/json',
//   dataschema: undefined,
//   subject: '123',
//   time: '2021-09-06T16:38:49.717Z',
//   origintime: '2021-09-06T16:29:26.527Z',
//   originid: '-of0T1jfpvD7_lOXtynbb',
//   originsource: 'https://www.my-website.come/my/page/123',
//   origintype: 'cmd.do-this-command.v0'
// }
```

|                 | Required | Type   | Default                              | Notes                                                                                    |
|-----------------|----------|--------|--------------------------------------|------------------------------------------------------------------------------------------|
| data            |          | Any    |                                      |                                                                                          |
| datacontenttype |          | String |                                      | If "data" is present, defaults to "application/json" unless specified otherwise          |
| dataschema      |          | String |                                      |                                                                                          |
| source          | yes      | String | process.env.MILL_CLOUDEVENTS_SOURCE  | Recommended to use universal identifier (e.g. https://my-domain.com/my/feature/path/123) |
| specversion     | yes      | String | 1.0                                  | Cloudevent specification version                                                         |
| subject         |          | String |                                      |                                                                                          |
| type            | yes      | String |                                      |                                                                                          |
| origintime      | yes      | String | "time" property                      | "time" property is internally generated as part of the package                           |
| originid        | yes      | String | "id" property                        | "id" property is internally generated as part of the package                             |
| originsource    | yes      | String | "source" property                    |                                                                                          |
| origintype      | yes      | String | "type" property                      |                                                                                          |

## Release new version

```bash
npm version <major|minor|patch>
npm run depoy
```
