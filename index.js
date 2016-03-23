'use strict';

// Return a copy of the given value, taking a predictable amount of space.
exports.recreateValue = function (jsonCompatibleData) {
  var str = JSON.stringify(jsonCompatibleData);
  return JSON.parse(exports.forceStringCopy(str));
}

exports.gcCollect = function () {
  if(typeof global.gc !== 'function')
    throw Error('You should expose GC, run Node with "--expose-gc".');
  global.gc();
}

exports.forceStringCopy = function (str) {
  if (typeof str !== 'string')
    return str;
  return (' ' + str).substr(1);
}

exports.recreateReturnObjectAndGcCollect = function (fn) {
  return function wrapper() {
    var obj = exports.recreateValue(fn.apply(this, arguments));
    exports.gcCollect();
    return obj;
  }
}
