var through = require('through2');
var cheerio = require('cheerio');
var path = require('path');

module.exports = function() {

  return through.obj(function(file, enc, callback) {
    var html = file.contents.toString();

    var $ = cheerio.load(html);
    
    $('script[src]').each(function() {
      var src = $(this).attr('src');
      if (isRelative(src)) {
        html = html.replace(src, './' + path.basename(src));
      }
    });

    $('link[rel=stylesheet]').each(function() {
      var src = $(this).attr('href');
      if (isRelative(src)) {
        html = html.replace(src, './' + path.basename(src));
      }
    });

    file.contents = new Buffer(html);
    callback(null, file);
  });
};

function isRelative(file) {
  return file.charAt(0) === '.';
}
