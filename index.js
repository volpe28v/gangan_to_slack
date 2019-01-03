const { WebClient } = require('@slack/client');
const gangan = require('./gangan');
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

console.log("Start Gangan to Slack server");

function crowl_gangan(){
  gangan.latest()
    .then((results) => {
      results.forEach((result) => {
        console.log(result);
        const is_changed = storage.updateOrAddItem(result, json_file);

        if (is_changed){
          const message = get_notify_message(result);
          web.chat.postMessage({ channel: channel, text: message, username: 'gangan' })
            .then((res) => { console.log('Message sent: ', res.ts); })
            .catch(console.error);
        }else{
          console.log('no change');
        }
      });
    });
}

function get_notify_message(item){
  return `${item.title}\n${item.date}\n${item.sub_title}\n${item.base_url + item.view_url}`;
}
