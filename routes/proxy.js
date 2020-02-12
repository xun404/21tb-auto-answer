var express = require('express');
var router = express.Router();
var fly = require("flyio");

fly.config.headers = {
  'Accept-Encoding': 'gzip, deflate, br',
  'Connection': 'keep-alive',
  'Accept': '*/*',
  'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/7.0.10(0x17000a21) NetType/WIFI Language/zh_CN',
  'Referer': 'https://servicewechat.com/wxb71723cb3500f701/22/page-frame.html',
  'Accept-Language': 'zh-cn'
}
fly.config.timeout = 10000;

router.post('/21tb/:do', function (req, res, next) {
  console.log(req.params.do);
  fly.post('https://v4.21tb.com/race-mobile/mina/' + req.params.do + '.do', req.body, { headers: { "content-type": "application/x-www-form-urlencoded" } })
    .then(d => {
      console.log(d.data.data)
      if (d.data.data) {
        if (d.data.data instanceof Array) {
          for (var inx in d.data.data) {
            var data = d.data.data[inx];
            if (data.examItem && data.examItem.itemOptions) {
              var itemOptions = d.data.data.examItem.itemOptions;
              if (itemOptions) {
                for (var inx in itemOptions) {
                  var item = itemOptions[inx]
                  if (item.isCorrect) {
                    item.content = '✅' + item.content;
                  }
                }
              }
            }
          }
        } else {
          if (d.data.data.examItem && d.data.data.examItem.itemOptions) {
            var itemOptions = d.data.data.examItem.itemOptions;
            if (itemOptions) {
              for (var inx in itemOptions) {
                var item = itemOptions[inx]
                if (item.isCorrect) {
                  item.content = '✅' + item.content;
                }
              }
            }
          }
        }
      }
      res.send(d.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

module.exports = router;

