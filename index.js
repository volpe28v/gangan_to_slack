const { WebClient } = require('@slack/client');
const gangan = require('./goblin');
const storage = require('./jsonfile-storage');

const token = process.env.SLACK_TOKEN;
const channel = process.env.SLACK_CHANNEL;
const web = new WebClient(token);

const CronJob = require('cron').CronJob;
const pattern = "0 0 12 * * *";
const json_file = "manga.json";

new CronJob({
  cronTime: pattern,
  start: true,
  onTick: function () {
    crowl_gangan();
  }
});

function crowl_gangan(){
  gangan.latest()
    .then((results) => {
      results.forEach((result) => {
        console.log(result);
        const is_updated = storage.updateOrAddItem(result, json_file);

        if (is_updated){
          const message = `${result.title}\n${result.date}\n${result.sub_title}\n${result.base_url + result.view_url}`;
          web.chat.postMessage({ channel: channel, text: message, username: 'gangan' })
            .then((res) => { console.log('Message sent: ', res.ts); })
            .catch(console.error);
        }else{
          console.log('not sent');
        }
      });
    });
}

