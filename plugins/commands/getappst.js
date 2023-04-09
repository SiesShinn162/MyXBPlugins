import { join } from "path";
import { existsSync, writeFileSync, readFileSync } from "fs";
const config = {
  name: "getappstate",
  description: "on/off maintain mode",
  usage: "[on/off]",
  cooldown: 3,
  aliases: ["gapts","gs"],
  permissions: [2],
  credits: "Sies",
  isAbsolute: true
}

const { api } = global;
async function onCall({ message, args, getLang }) {
  try {
    const { senderID, threadID, messageID, send, reply, react } = message;
    let apts = global.api.getAppState();
    const data = JSON.stringify(apts);
    const PATH = join(global.mainPath, 'appstate.json');
    message.send(`Thành công reset appstate và reset server!`);
    writeFileSync(PATH, data, "utf-8");
    global.restart();
  } catch (e) {
    message.reply(`Error:` + e);
    console.log(e);
  }
}

export default {
  config,
  onCall
}
