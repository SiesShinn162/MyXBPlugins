const { api } = global;
import axios from 'axios';
async function onCall({ message, getLang, args }) {
  const { Users } = global.controllers
  global.chanle || (global.chanle = new Map);
  var bcl = global.chanle.get(message.threadID);
  const anhbcl = (await axios.get("https://i.imgur.com/LClPl36.jpg", {
    responseType: "stream"
  })).data;
  const { senderID, threadID, messageID, body, send, reply, react } = message;
  var cl = ["chẵn", "lẻ"]
  var o = (await Users.getMoney(message.senderID) || null, cl[Math.floor(Math.random() * cl.length)]);
  if (message.body && ("chẵn" == message.body.toLowerCase() || "lẻ" == message.body.toLowerCase())) {
    const bcl = global.chanle.get(message.threadID) || {};
    if (!bcl) return;
    if (1 != bcl.start) return;
    if (!bcl.player.find((player) => player.userID == message.senderID)) return;
    var i, c = bcl.player.findIndex((player) => player.userID == message.senderID);
    if (1 == (i = bcl.player[c]).choose.status) return global.api.sendMessage("Bạn đã chọn rồi không thể chọn lại!", message.threadID, message.messageID);
    "chẵn" == message.body.toLowerCase() ? (bcl.player.splice(c, 1), bcl.player.push({
      name: i.name,
      userID: message.senderID,
      choose: {
        status: !0,
        msg: "chẵn"
      }
    }), global.api.sendMessage(`${i.name} đã chọn chẵn`, message.threadID, message.messageID)) : (bcl.player.splice(c, 1), bcl.player.push({
      name: i.name,
      userID: message.senderID,
      choose: {
        status: !0,
        msg: "lẻ"
      }
    }), global.api.sendMessage(`${i.name} đã chọn lẻ`, message.threadID, message.messageID));
    var m = 0,
      u = bcl.player.length;
    for (var l of bcl.player) 1 == l.choose.status && m++;
    if (m != u) return; {
      const roll = (await axios.get("https://i.imgur.com/P3UEpfF.gif", {
        responseType: "stream"
      })).data;
      global.api.sendMessage({
        body: "Đang kiểm tra kết quả...",
        attachment: roll
      }, message.threadID, async (err, data) => {
        if (err) return global.api.sendMessage(err, message.threadID, message.messageID);
        setTimeout((async function() {
          global.api.unsendMessage(data.messageID);
          var t = o,
            r = [],
            h = [];
          var i = images();
          if (0 == t.indexOf("chẵn"))
            for (var c of bcl.player) "chẵn" == c.choose.msg ? r.push({
              name: c.name,
              userID: c.userID
            }) : h.push({
              name: c.name,
              userID: c.userID
            });
          else
            for (var c of bcl.player) "lẻ" == c.choose.msg ? r.push({
              name: c.name,
              userID: c.userID
            }) : h.push({
              name: c.name,
              userID: c.userID
            });
          const m = (await axios.get(i[Math.floor(5 * Math.random())], {
            responseType: "stream"
          })).data;
          var u = "💎 𝐊𝐄̂́𝐓 𝐐𝐔𝐀̉ 𝐋𝐀̀: " + t.toUpperCase() + "\n\n➣ 𝐍𝐡𝐮̛̃𝐧𝐠 𝐜𝐨𝐧 𝐯𝐨̛̣ 𝐭𝐡𝐚̆́𝐧𝐠 𝐜𝐮̛𝐨̛̣𝐜 𝐭𝐫𝐨𝐧𝐠 𝐯𝐚́𝐧 𝐧𝐚̀𝐲 💸:\n",
            l = 0,
            p = 0;
          for (var d of r) {
            await Users.getMoney(d.userID);
            await Users.increaseMoney(d.userID, bcl.money), u += ++l + ". " + d.name + "\n------------\n"
          }
          for (var y of h) {
            await Users.getMoney(y.userID);
            await Users.decreaseMoney(y.userID, bcl.money), 0 == p && (u += "\n➣ 𝐍𝐡𝐮̛̃𝐧𝐠 𝐜𝐨𝐧 𝐯𝐨̛̣ 𝐭𝐡𝐮𝐚 𝐜𝐮̛𝐨̛̣𝐜 𝐭𝐫𝐨𝐧𝐠 𝐯𝐚́𝐧 𝐧𝐚̀𝐲 😿:\n"), u += ++p + ". " + y.name + "\n------------\n"
          }
          return u += "\n• 𝐍𝐡𝐮̛̃𝐧𝐠 𝐧𝐠𝐮̛𝐨̛̀𝐢 𝐭𝐡𝐚̆́𝐧𝐠 𝐧𝐡𝐚̣̂𝐧 𝐯𝐞̂̀: + " + bcl.money + "$\n", u += "• 𝐍𝐡𝐮̛̃𝐧𝐠 𝐧𝐠𝐮̛𝐨̛̀𝐢 𝐭𝐡𝐮𝐚 𝐛𝐢̣ 𝐭𝐫𝐮̛̀: - " + bcl.money + "$\n-----------\n Game created by Sies!", global.chanle.delete(message.threadID), global.api.sendMessage({
            body: u,
            attachment: m
          }, message.threadID, message.messageID)
          function images() {
            if ("chẵn" == t)
              var i = ["https://i.imgur.com/6fIJU1q.jpg", "https://i.imgur.com/XPg6Uvq.jpg", "https://i.imgur.com/IWjB9kN.jpg", "https://i.imgur.com/XVxgPhY.png", "https://i.imgur.com/dRzktqf.png"];
            else if ("lẻ" == t)
              i = ["https://i.imgur.com/u1DjwX0.png", "https://i.imgur.com/unnBcv9.png", "https://i.imgur.com/181R8Te.jpg", "https://i.imgur.com/y67IGtv.jpg", "https://i.imgur.com/y67IGtv.jpg"];
            return i;
          }
          
        }), global.api.unsendMessage(data.messageID) , 5000)

      });
    }
  }
}

export default {
  onCall
}