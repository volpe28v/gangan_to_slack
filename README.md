# gangan_to_slack
ガンガンONLINE の更新通知を Slack に送信する

- ゴブリンスレーヤー(３種)のみ対応
- 毎日 12:00 に更新チェックが走る

# Install
```
$ npm install
```

# Usage
- SLACK_TOKEN : An access token (from your Slack app or custom integration - xoxa, xoxp, or xoxb)
- SLACK_CHANNEL : This argument can be a channel ID, a DM ID, a MPDM ID, or a group ID

```
SLACK_TOKEN=xxxxxxxxxx SLACK_CHANNEL=yyyyyyyy node index.js
```

# Hint
- Slack のトークンは https://my.slack.com/services/new/bot から bot を作成して取得できる
- 通知を送りたいチャンネルに作成した bot を招待しておく
- 通知を送りたいチャンネルのIDはチャンネルを右クリックして「リンクをコピー」で取得できる (下記の xxxxxxxxx の部分)
  - https://hoge.slack.com/messages/xxxxxxxxx
- APIの参考: https://github.com/slackapi/node-slack-sdk
