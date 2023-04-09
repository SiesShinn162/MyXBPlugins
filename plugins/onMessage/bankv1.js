import { join, resolve } from 'path';
import { existsSync, writeFileSync, readFileSync } from "fs";
const laisuat = 0.015
const timeIM = 6000
async function onCall({ message, getLang, args }) {
  const { senderID, threadID, messageID, send, reply, react } = message;
  const PATH = join(global.assetsPath, 'bank.json');
  var dataJson = JSON.parse(readFileSync(PATH, "utf-8"));
  if (dataJson.some(i => i.senderID == senderID) == false) return
  while (true) {
    for (let item of PATH) {
      var userData = dataJson.find(item => item.senderID == message.senderID);
      var money = userData.money;
      userData.money = (parseInt(money + money * laisuat))
      writeFileSync(PATH, JSON.stringify(dataJson, null, 4), "utf-8");
    }
    console.log("UPDATING BANKING.......");
    await new Promise(resolve => setTimeout(resolve, timeIM * 1000))
  }
}
export default {
  onCall
}