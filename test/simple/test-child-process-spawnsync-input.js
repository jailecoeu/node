// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var common = require('../common');
var assert = require('assert');

var spawnSync = require('child_process').spawnSync;

var options = {
  input: 1234,
};

assert.throws(function() {
    spawnSync('cat', [], options)
  },
  /TypeError:.*should be Buffer or string not number/);

function checkRet(ret) {
  assert.strictEqual(ret.status, 0);
};

options = {
  input: 'hello world',
};

var ret = spawnSync('cat', [], options);

checkRet(ret);
assert.strictEqual(ret.stdout.toString('utf8'), options.input);
assert.strictEqual(ret.stderr.toString('utf8'), '');

options = {
  input: new Buffer("hello world"),
};

ret = spawnSync('cat', [], options);

checkRet(ret);
assert.deepEqual(ret.stdout, options.input);
assert.deepEqual(ret.stderr, new Buffer(''));
