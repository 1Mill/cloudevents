# Changelog for @1mill/cloudevents

## 4.1.0

* Add new optional `originatorid` attribute.
* Add unit tests for every Cloudevent attribute (e.g. `id`, `data`, `originid`, etc.) using `mocha`, `sinon`, and `chai`.

## 4.0.1

* Check that `process.env` be defined before using it to fix compatability issue with browsers.
* Replace `require` with `import`.

## 4.0.0

* Bundle package with `microbundle@^0.14.2` to build Browser and Node compatable versions.
* Change pacakge to `"type": "module"`.
