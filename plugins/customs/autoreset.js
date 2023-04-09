import cron from 'node-cron';
import { join } from "path";
import { existsSync, writeFileSync, readFileSync } from "fs";
const jobs = [
  {
    time: "00 6 * * *",
    message: () => "➝ 𝐁𝐚̂𝐲 𝐠𝐢𝐨̛̀ 𝐥𝐚̀ 𝟎𝟔:𝟎𝟎 𝐂𝐡𝐮́𝐜 𝐦𝐨̣𝐢 𝐧𝐠𝐮̛𝐨̛̀𝐢 𝐛𝐮𝐨̂̉𝐢 𝐬𝐚́𝐧𝐠 𝐯𝐮𝐢 𝐯𝐞̉ ❤️\n\nServer sẽ tiến hành khởi động lại!",
  },
  {
    time: "00 22 * * *",
    message: () => "➝ 𝗕𝗮̂𝘆 𝗚𝗶𝗼̛̀ 𝗟𝗮̀: 22:00:00\nServer sẽ tiến hành khởi động lại!",
    targetIDs: [""]
  }
]
export default function autoSend() {
  // cron.getTasks().forEach(task => task.stop());
  const timezone = global.config?.timezone || "Asia/Ho_Chi_Minh";
  if (!timezone) return;

  for (const job of jobs) {
    cron.schedule(job.time, () => {
      let i = 0;
      for (const tid of job.targetIDs || Array.from(global.data.threads.keys()) || []) {
        setTimeout(() => {
          global.api.sendMessage({
            body: job.message()
          }, tid, () => process.exit(1));

        }, (i++) * 300)
      }
    }, {
      timezone: timezone
    })
  }
}