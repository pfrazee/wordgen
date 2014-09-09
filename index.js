var fs = require('fs')
var crypto = require('crypto')

const NWORDS = 970
var dict

exports.generateWords = function(n, cb) {
  if (!dict) {
    fs.readFile('./dict.txt', 'utf8', function(err, str) {
      if (err) return cb(err)
      dict = str.split('\n')
      if (dict.length !== NWORDS) return cb(new Error('Dictionary file should contain 970 words, but has '+dict.length))

      doit()
    })
  } else {
    doit()
  }
  function doit() {
    getRandsWithin(NWORDS, n, function(err, rands) {
      if (err) return cb(err)
      var words = []
      for (i = 0; i < n; i++) {
        words.push(dict[rands[i]])
      }
      cb(null, words)
    })
  }
}

// Ladies and gents, a prime example of async callback hell
// The algorithm below, more sanely defined:
/*
function getRandWithin(max) {
  const rawmax = 65536 - (65536 % max)
  var v
  while ((v = getRand()) >= rawmax) {}
  return v % max
}
*/
// This algorithm was added to remove modulo bias and give an even distribution
// It rejects any values which are in the tail range
// e.g. if (max == 65530), then rejects 65530 through 65536

function getRand(cb) {
  crypto.randomBytes(2, function(err, b) {
    if (err) cb(err)
    else cb(null, b.readUInt16LE(0))
  })
}

function getRandWithin(max, cb) { 
  const rawmax = 65536 - (65536 % max)
  function checkValue(err, v) {
    if (err) return cb(err)
    if (v >= rawmax) return getRand(checkValue)
    cb(null, v % max)
  }
  getRand(checkValue)
}

function getRandsWithin(max, n, cb) {
  var rands = []
  for (var i=0; i < n; i++) {
    getRandWithin(max, function(err, v) {
      if (err) { rands = null; return cb(err) }
      if (rands) {
        rands.push(v)
        if (rands.length == n) cb(null, rands)
      }
    })
  }
}
