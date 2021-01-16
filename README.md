# @1mill/cloudevents

## Introduction

This package is an implementation and extention of the CloudEvents v1 specification to easily communicate with event streaming applications.
Currently only Kafka is suppported, but the intention is to make this library as agnostic as possible.

## How to install

```bash
npm install @1mill/cloudevents@^0.10
```

## Example

### Publish CloudEvent to event stream

```js
const { v4: { createCloudevent, createEventStream } } = require('@1mill/cloudevents')
const stream = createEventStream({
  protocol: 'kafka',
  urls: 'my-kafka-url:9092',
})

const cloudevent = createCloudevent({
  data: JSON.stringify({
    my: true,
    payload: { something: true },
  }),
  datacontenttype: 'application/json',
  id: 'my-id',
  source: 'my-source',
  type: 'my-type.version.modifier',
})
stream.emit({ cloudevent })
```

### Subscribe to event stream

```js
const { v4: { createEventStream } } = require('@1mill/cloudevents')
const stream = createEventStream({
  protocol: 'kafka',
  urls: 'my-kafka-urls:9092',
})
stream.listen({
  handler: ({ cloudevent }) => {
    const { my, payload } = JSON.parse(cloudevent.data)
    console.log(my + payload)
  },
  types: [
    'my-other-type.version.modifier',
    'my-type.version.modifier',
  ]
})
```

### Lambda handler

```js
const { v4: { createEventStream } } = require('@1mill/cloudevents')

const perform = async ({ cloudevent }) => {
  const { my, payload } = JSON.parse(cloudevent.data)
  await new Promise((resolve, _reject) => {
    setTimeout(() => {
      console.log(my + payload)
      resolve()
    }, 1000)
  })
}

const lambda = createEventStream({ protocol: 'lambda' })
exports.handler = lambda.handler(perform)
```

## Release new version

```bash
npm version <major|minor|patch>
npm publish
```
