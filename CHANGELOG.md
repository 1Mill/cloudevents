# Changelog for @1mill/cloudevents

## 5.1.1

* Update `node` build environment from `20` to `22`
* Update packages via `npm audit fix`
* Update `caniuse-lite` from `1.0.30001651` to `1.0.30001761`

## 5.1.0

* Add `ce_` prefix to `id` attribute.
* Downgrade `nanoid` from `^5.0.7` to `^3.3.4` to make commonjs compatability easier.
* Increase `id` attribute length from `21` to `36` to match character length of UUID v4 and reduce collision changes.

## 5.0.0

* Add optional `actor` attribute.

### Breaking changes

* JSON stringify `data` by default unless `datacontenttype` is input.
  * `datacontenttype` already defauls to `application/json` if `data` is not `undefined` and no `datacontentype` is provided.
* Remove `originactor` attribute.
* Remove `originator({ ... })` instance method.
* Remove `originatorid` attribute.
* Remove `process.env.MILL_CLOUDEVENTS_NANOID_LENGTH` support.
* Remove `wschannel({ ... })` instance method.
* Update `nanoid` from `^3.3.4` to `^5.0.7`, requiring `"node": "^18 || >=20"`.

## 4.6.3

* Update `README` to better reflect deployment process

## 4.6.2

* Update `nanoid` from `^3.3.4` to `^3.3.7`.
* Move `sinon-chai` to `devDependencies`.
* Update various `devDependencies`.

## 4.6.1

* Fix spelling in `README.md`.

## 4.6.0

* Add `cloudevent.originactor` attribute and support in `cloudevent.origin({...})` instance method.
* Depricate `cloudevent.originator({...})` instance method.
* Depricate `cloudevent.originatorid` attribute.

## 4.5.0

* Add `cloudevent.originator({...})` instance method.
* Improve unit tests for `cloudevent.wschannel({...})`.

## 4.4.1

* Use `const ce = this` in constructor to cosmetically match instance method declarations.

## 4.4.0

* Add `cloudevent.wschannel({...})` instance method
* Update `README.md`

## 4.3.0

* Add `cloudevent.origin({...})` instance method
* Update `README.md`

## 4.2.1

* Upgrade to `microbundle@^0.15.1`

## 4.2.0

* Add optional `wschannelid` attribute.
* Fix unit test description.

## 4.1.1

* Improve formatting of code.
* Update `README.md`.

## 4.1.0

* Add optional `originatorid` attribute.
* Add unit tests for every Cloudevent attribute (e.g. `id`, `data`, `originid`, etc.) using `mocha`, `sinon`, and `chai`.
* Update `nanoid@^3.3.4`

## 4.0.1

* Check that `process.env` be defined before using it to fix compatability issue with browsers.
* Replace `require` with `import`.

## 4.0.0

* Bundle package with `microbundle@^0.14.2` to build Browser and Node compatable versions.
* Change pacakge to `"type": "module"`.
