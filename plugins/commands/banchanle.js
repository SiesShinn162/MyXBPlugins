import axios from 'axios';

const config = {
  name: "chanle",
  aliases: ["bcl"],
  description: "Chơi chẵn lẻ nhiều người!",
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
    const { senderID, threadID, messageID, body, send, reply, react } = message;
    const { Users } = global.controllers
    global.chanle || (global.chanle = new Map);
    var bcl = global.chanle.get(message.threadID);
    const anhbcl = (await axios.get("https://i.imgur.com/LClPl36.jpg", {
      responseType: "stream"
    })).data;
    switch (args[0]) {
      case "taophong":
      case "new":
      case "-c": {
        if (!args[1] || isNaN(args[1])) return global.api.sendMessage("[SIES-WARN ⚠] » Bạn cần nhập số tiền đặt cược!", message.threadID, message.messageID);
        if (parseInt(args[1]) < 5000) return global.api.sendMessage("[SIES-WARN ⚠] » Số tiền phải lớn hơn hoặc bằng 5000", message.threadID, message.messageID);
        const userMoney = await Users.getMoney(message.senderID) || null;
        if (userMoney < parseInt(args[1])) return global.api.sendMessage(`[SIES-WARN ⚠] » Bạn không có đủ ${args[1]} để tạo bàn game mới!!`, message.threadID, message.messageID);
        if (global.chanle.has(message.threadID)) return global.api.sendMessage("[SIES-WARN ⚠] » Nhóm này đã được mở bàn game!", message.threadID, message.messageID);
        const name = (await global.controllers.Users.getInfo(message.senderID))?.name || message.senderID;
        return global.chanle.set(message.threadID, {
          box: message.threadID,
          start: !1,
          author: message.senderID,
          player: [{
            name: name,
            userID: message.senderID,
            choose: {
              status: !1,
              msg: null
            }
          }],
          money: parseInt(args[1])
        }), global.api.sendMessage("[SIES-NOTI] »Tạo thành công phòng chẵn lẻ với số tiền cược là :" + args[1], message.threadID)
      }
      case "thamgia":
      case "-j": {
        if (!global.chanle.has(message.threadID)) return global.api.sendMessage("[SIES-WARN ⚠] » Nhóm này hiện chưa có bàn game nào!\n=> Vui lòng hãy tạo bàn game mới để tham gia!", message.threadID, message.messageID);
        if (1 == bcl.start) return global.api.sendMessage("[SIES-WARN ⚠] » Hiện tại bàn game này đã bắt đầu từ trước!", message.threadID, message.messageID);
        const playerMoney = await Users.getMoney(message.senderID) || null;
        if (playerMoney < bcl.money) return global.api.sendMessage(`[SIES-WARN ⚠] » Bạn không có đủ $ để tham gia bàn game này! ${bcl.money}$`, message.threadID, message.messageID);
        const name = (await global.controllers.Users.getInfo(message.senderID))?.name || message.senderID;
        if (bcl.player.find((player) => player.userID == message.senderID)) return global.api.sendMessage("Hiện tại bạn đã tham gia bàn game này!", message.threadID, message.messageID);
        return bcl.player.push({
          name: name,
          userID: message.senderID,
          choose: {
            stats: !1,
            msg: null
          }
        }), global.chanle.set(message.threadID, bcl), global.api.sendMessage(`[ SIES-NOTI ] »Bạn đã tham gia bàn game!\n=> Số thành viên hiện tại là : ${bcl.player.length}`, message.threadID, message.messageID)
      }
      case "batdau":
      case "-s":
        return bcl ? bcl.author != message.senderID ? global.api.sendMessage("[SIES-WARN ⚠] » Bạn không phải là người tạo ra bàn game này nên không thể bắt đầu game", message.threadID, message.messageID) : bcl.player.length <= 1 ? global.api.sendMessage("[SIES-WARN ⚠] » Bàn game của bạn không có đủ thành viên để có thể bắt đầu!", message.threadID, message.messageID) : 1 == bcl.start ? global.api.sendMessage("[SIES-WARN ⚠] » Hiện tại bàn game này đã bắt đầu từ trước!", message.threadID, message.messageID) : (bcl.start = !0, global.chanle.set(message.threadID, bcl), global.api.sendMessage(`[SIES-NOTI ] » Game bắt đầu\n\nSố thành viên : ${bcl.player.length}\n\nVui lòng chat "Chẵn" hoặc "Lẻ" `, message.threadID)) : global.api.sendMessage("[SIES-WARN ⚠] » Nhóm này hiện chưa có bàn game nào!\n=> Vui lòng hãy tạo bàn game mới để tham gia!", message.threadID, message.messageID);
      case "end":
      case "-e":
        return bcl ? bcl.author != message.senderID ? global.api.sendMessage("[SIES-WARN ⚠] » Bạn không phải là người tạo ra bàn game nên không thể xóa bàn game", message.threadID, message.messageID) : (global.chanle.delete(message.threadID), global.api.sendMessage("[ SIES-NOTI ] »Đã xóa bàn game!", message.threadID, message.messageID)) : global.api.sendMessage("[SIES-WARN ⚠] » Nhóm này hiện chưa có bàn game nào!\n=> Vui lòng hãy tạo bàn game mới để tham gia!", message.threadID, message.messageID);
      case "roiphong":
      case "-l":
        if (!global.chanle.has(message.threadID)) return api.sendMessage('[SIES-WARN ⚠] » 𝐇𝐢𝐞̣̂𝐧 𝐭𝐚̣𝐢 𝐤𝐡𝐨̂𝐧𝐠 𝐜𝐨́ 𝐛𝐚̀𝐧 𝐠𝐚𝐦𝐞 𝐧𝐚̀𝐨 𝐜𝐡𝐨 𝐛𝐚̣𝐧 𝐫𝐨̛̀𝐢 !', message.threadID, message.messageID);
        if (!bcl.player.find((player) => player.userID == message.senderID)) return api.sendMessage('[SIES-WARN ⚠] » 𝐁𝐚̣𝐧 𝐤𝐡𝐨̂𝐧𝐠 𝐜𝐨́ 𝐭𝐫𝐨𝐧𝐠 𝐛𝐚̀𝐧 𝐠𝐚𝐦𝐞 đ𝐞̂̉ 𝐫𝐨̛̀𝐢 !', threadID, messageID);
        if (bcl.start == true) return api.sendMessage('[SIES-WARN ⚠] » 𝐁𝐚̀𝐧 𝐠𝐚𝐦𝐞 𝐯𝐮̛̀𝐚 𝐬𝐭𝐚𝐫𝐭 𝐤𝐡𝐨̂𝐧𝐠 𝐭𝐡𝐞̂̉ 𝐫𝐨̛̀𝐢 !', threadID, messageID);
        if (bcl.author == message.senderID) {
          global.chanle.delete(message.threadID);
          const name = (await global.controllers.Users.getInfo(message.senderID))?.name || message.senderID;
          return global.api.sendMessage('[SIES-NOTI ⚠] » ➣ 𝐂𝐨𝐧 𝐠𝐡𝐞̣̂ <' + name + '> 𝐯𝐮̛̀𝐚 𝐫𝐨̛̀𝐢 𝐤𝐡𝐨̉𝐢 𝐛𝐚̀𝐧 𝐠𝐚𝐦𝐞, 𝐛𝐚̀𝐧 𝐠𝐚𝐦𝐞 𝐜𝐮̉𝐚 𝐧𝐡𝐨́𝐦 𝐬𝐞̃ 𝐠𝐢𝐚̉𝐢 𝐭𝐚́𝐧 !', message.threadID, message.messageID);
        }
        else {
          bcl.player.splice(bcl.player.findIndex((player) => player.userID == message.senderID), 1);
          global.chanle.set(message.threadID, bcl);
          const name = (await global.controllers.Users.getInfo(message.senderID))?.name || message.senderID;
          global.api.sendMessage('[SIES-NOTI] » 𝐂𝐨𝐧 𝐠𝐡𝐞̣̂ 𝐫𝐨̛̀𝐢 𝐛𝐚̀𝐧 𝐭𝐡𝐚̀𝐧𝐡 𝐜𝐨̂𝐧𝐠', message.threadID, message.messageID);
          return global.api.sendMessage('[ SIES-NOTI ] »➣ 𝐂𝐨𝐧 𝐠𝐡𝐞̣̂  <' + name + '> 𝐯𝐮̛̀𝐚 𝐫𝐨̛̀𝐢 𝐤𝐡𝐨̉𝐢 𝐛𝐚̀𝐧 𝐠𝐚𝐦𝐞 !\n=> 𝐇𝐢𝐞̣̂𝐧 𝐭𝐚̣𝐢 𝐛𝐚̀𝐧 𝐠𝐚𝐦𝐞 𝐜𝐨̀𝐧 ' + bcl.player.length + ' 𝐧𝐠𝐮̛𝐨̛̀𝐢 𝐜𝐡𝐨̛𝐢', message.threadID);
        }
        
      default:
        return global.api.sendMessage({
          body: "====Chơi Chẵn Lẻ Nhiều Người=====\n1.=>chanle -c/taophong <price> để tạo phòng\n2.=>chanle thamgia để vào phòng\n3.=>chanle batdau để bắt đầu trò chơi\n4.=>chanle end để xóa phòng",
          attachment: anhbcl
        }, message.threadID, message.messageID)
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
