# Description
#   A Hubot script that search nnh.to
#
# Configuration:
#   None
#
# Commands:
#   hubot mm/dd - search nnh.to
#
# Author:
#   bouzuya <m@bouzuya.net>
#
module.exports = (robot) ->
  request = require 'request-b'
  cheerio = require 'cheerio'
  {Iconv} = require 'iconv'

  robot.respond /(\d\d)\/(\d\d)$/i, (res) ->
    url = "http://www.nnh.to/#{res.match[1]}/#{res.match[2]}.html"
    request(url: url, encoding: null).then (r) ->
      iconv = new Iconv('SHIFT_JIS', 'UTF-8')
      $ = cheerio.load iconv.convert(r.body).toString()
      days = []
      $('.ordinary').each ->
        e = $ @
        days.push e.text()
      res.send [url].concat(days).join '\n'
