'use strict'
var tape = require('tape');


module.exports = function(opts) {
  tape('generates words (10 words each, 50 samples)', function(t) {
    var wg = require('../');
    var n = 0;

    wg.generateWords(10, check)
    function check(err, words) {
      if (err) { console.error(err); throw err }
      console.log('Generated:', words.join(' '))
      
      t.equal(words.filter(function(word) { return !!word }).length, 10)
      n++

      if (n == 50) t.end()
      else wg.generateWords(10, check)
    }

  })
}

if(!module.parent)
  module.exports({ });
