import axios from 'axios';
import moment from "moment-timezone";
const config = {
  name: "sendmsg",
  aliases: ["smsg"],
  description: "send smt to sb",
  usage: "dùng đi rồi biết á",
  cooldown: 3,
  permissions: [0, 1, 2],
  isAbsolute: false,
  isHidden: false,
  credits: "Sies",

}

const { api } = global;
async function onCall({ message, args, getLang, extra, data, userPermissions, prefix }) {
  // Do something
  try {
    var gio = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss D/MM/YYYY");
    var msg = args.splice(2).join(" ");
    const { senderID, threadID, messageID, send, reply, react } = message;
    if (args[0] == 'user') {
      return global.api.sendMessage(`Vào lúc: ${gio}\n𝑩𝑨̣𝑵 𝑪𝑶́ 𝑻𝑰𝑵 𝑵𝑯𝑨̆́𝑵 𝑻𝑼̛̀ 𝑨𝑫𝑴𝑰𝑵 𝑮𝑼̛̉𝑰 Đ𝑬̂́𝑵 !!!\nNội dung: ` + msg, args[1]).then(
        global.api.sendMessage('Đã gửi tin nhắn đến thành viên ' + args[1] + ' thành công', message.threadID, message.messageID));
    } else {
      if (args[0] == 'thread') {
        return global.api.sendMessage(`Vào lúc: ${gio}\n𝑻𝑰𝑵 𝑵𝑯𝑨̆́𝑵 𝑹𝑰𝑬̂𝑵𝑮 Đ𝑬̂́𝑵 𝑵𝑯𝑶́𝑴 𝑩𝑨̣𝑵 𝑻𝑼̛̀ 𝑨𝑫𝑴𝑰𝑵 !\nNội dung: ` + msg, args[1]).then(
          global.api.sendMessage('Đã gửi tin nhắn đến nhóm ' + args[1] + ' thành công', threadID, messageID))
      }
    }
  } catch (e) {
    message.send("Error :", e);
    console.error(e);
  }



}


export default {
  config,
  onCall
}

// or
// export {
//     config,
//     langData,
//     onCall
// }
