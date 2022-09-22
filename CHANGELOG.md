# Changelog for @1mill/cloudevents

## 4.6.1

* Fix spelling in `README.md`

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
