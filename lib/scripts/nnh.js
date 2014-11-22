// Description
//   A Hubot script that search nnh.to
//
// Configuration:
//   None
//
// Commands:
//   hubot mm/dd - search nnh.to
//
// Author:
//   bouzuya <m@bouzuya.net>
//
module.exports = function(robot) {
  var Iconv, cheerio, request;
  request = require('request-b');
  cheerio = require('cheerio');
  Iconv = require('iconv').Iconv;
  return robot.respond(/(\d\d)\/(\d\d)$/i, function(res) {
    var url;
    url = "http://www.nnh.to/" + res.match[1] + "/" + res.match[2] + ".html";
    return request({
      url: url,
      encoding: null
    }).then(function(r) {
      var $, days, iconv;
      iconv = new Iconv('SHIFT_JIS', 'UTF-8');
      $ = cheerio.load(iconv.convert(r.body).toString());
      days = [];
      $('.ordinary').each(function() {
        var e;
        e = $(this);
        return days.push(e.text());
      });
      return res.send([url].concat(days).join('\n'));
    });
  });
};
