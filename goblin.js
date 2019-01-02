var client = require('cheerio-httpcli');

var backnumber_url = 'https://gihyo.jp/magazine/wdpress/backnumber?start='
var goblin_urls = [
'http://www.ganganonline.com/contents/goblin/',
'http://www.ganganonline.com/contents/goblinbd/',
'http://www.ganganonline.com/contents/goblinyo/'
]


module.exports.latest = function(keyword, page = 0){
  var requests = goblin_urls.map(function(url){
    return new Promise(function(resolve, reject){
      client.fetch(url, {})
        .then(function(result){
          resolve({
            title: result.$('#gn_content_h2').text(),
            date: result.$('.gn_detail_story_list_date').text(),
            sub_title: result.$('.gn_detail_story_list_ttl').text(),
            base_url: url,
            view_url: result.$('.gn_link_btn').attr('href')
          })
        })
        .catch(function(err){
          reject(err);
        });
    });
  });

  return Promise.all(requests)
}
