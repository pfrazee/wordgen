var fs = require('fs')
var crypto = require('crypto')

var NWORDS = 970
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
	  crypto.randomBytes(n * 2, function(err, buff) {
	    if (err) return cb(err)
	    var words = []
	    for (i = 0; i < n; i++) {
	      words.push(dict[buff.readUInt16LE(i) % NWORDS])
	    }
	    cb(null, words)
	  })
	}
}