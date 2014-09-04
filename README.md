# Random Word Generator

Generates a random list of words using `crypto.randomBytes` and a subset of the [New General Service List](http://www.newgeneralservicelist.org/).

```js
var wg = require('wordgen')
wg.generateWords(10, function (err, words) {
  if (err) throw err
  console.log(words.join(' '))
  // => think certainly agree case common certainly military plan earn except
  // (for example)
})
```