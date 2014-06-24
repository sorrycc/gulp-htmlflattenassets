var hfa = require('../');
var gulp = require('gulp');
var through = require('through2');
var read = require('fs').readFileSync;

describe('hfa', function() {

  it('normal', function(done) {
    gulp
      .src('./test/fixtures/a.html')
      .pipe(hfa())
      .pipe(through.obj(function(file) {
        var expected = read('./test/fixtures/a-expected.html', 'utf-8');
        file.contents.toString().should.be.eql(expected);
        done();
      }));
  });
});
