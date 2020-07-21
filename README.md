# @1mill/cloudevents

## Introduction

This package is an implementation of CloudEvents v1 over event streaming applications.
Currently, only Kafka is supported, but the intention is to make this as platform agnostic as possible.

## How to install

```bash
npm install @1mill/cloudevents
```

## Example

### Publish CloudEvent to event stream

```js
const {
  KAFKA_EVENTTYPE,
  create,
  createBroker,
  publish,
} = require('@1mill/cloudevents');

const broker = createBroker({
  eventType: KAFKA_EVENTTYPE,
  id: 'my-unique-producer-id',
  urls: ['http://my-kafka-url:9092/'],
});

const cloudevent = create({
  type: 'my-topic.version',
});

publish({
  broker,
  cloudevent,
});
```

### Subscribe to CloudEvents from event stream

```js
const {
  KAFKA_EVENTTYPE,
  create,
  createBroker,
  publish,
  subscribe,
} = require('@1mill/cloudevents');

const broker = createBroker({
  eventType: KAFKA_EVENTTYPE,
  id: 'my-unique-producer-id',
  urls: ['http://my-kafka-url:9092/'],
});

subscribe({
  broker,
  hanlder: async({ cloudevent, data, enrichment, isEnriched }) => {
    if (!isEnriched) {
      return 'Enrich and re-publish event with this value'
    } else {
      console.log(enrichment);
    }
  },
  types: ['my-topic.version', 'my-other-topic.version'],
})
```

### Publish event to Dead Letter Exchange

```js
...

subscribe({
  broker,
  hanlder: async({ cloudevent }) => {
    try {
      ...
    } catch (err) {
      console.error('Something went wrong!')
      publish({
        broker,
        cloudevent: {
          ...cloudevent,
          dlx: 'my-dead-letter-exchange-topic',
        },
      });
    }
  },
  types: ['my-topic.version']
})
```

## Release new version

```bash
npm version <major|minor|patch>
npm publish
```
