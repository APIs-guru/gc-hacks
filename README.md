# gc-hacks
Collection of ugly hacks, for JS garbage collector. __Use only as a last resort__.

Code based on disscussion from [this](https://github.com/cheeriojs/cheerio/issues/263) thread.
And I higly recomend to read it before using this module.

Big thanks to @adamhooper for code suggestion and great advice:
> And don't use these workarounds normally. Only use them when you have identified a problem and you are certain this fixes the problem, and you have commented why it fixes the problem.

## Installation

```bash
npm install -g api-spec-converter
```

## Usage

```js
var gcHacks = require('gc-hacks');

var veryLongString = 'xxxxxxxxxxxxxxxxxxxxx....';
var partString = veryLongString.substr(1);

// Now 'veryLongString' stuck in memory until `partString` exist
// or we can do force 'partString' to be copied.
partString = forceStringCopy(partString);

// But what if string inside object or array
// Like this:
var array = [veryLongString.substr(1)];

// Just use 'recreateObject' it work with any JSON-compatible value
array = recreateValue(array);

// Sometime GC don't free memory for long time.
// But you can force it if you run this function:
gcHacks.gcCollect();
// Note: you need to run node with '--expose-gc' argument.

// You can also wrap any function to do both hacks:
var hackedFunction = gcHacks.recreateReturnObjectAndGcCollect(someFunction);

// Or use it with promises:
somePromise
  .then(recreateReturnObjectAndGcCollect(function (arg1, arg2) {
    return [veryLongString.substr(1)];
  })
```
