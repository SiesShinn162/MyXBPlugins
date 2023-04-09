import axios from 'axios';
const config = {
  name: "sbankv2",
  aliases: ["sbv2"],
  description: "một cái ngân hàng nho nhỏ có api:>",
  usage: "dùng đi rồi biết á",
  cooldown: 3,
  permissions: [0, 1, 2],
  isAbsolute: false,
  isHidden: false,
  credits: "Sies",

}



async function onCall({ message, args, getLang, extra, data, userPermissions, prefix }) {
  // Do something
  try {
    const { senderID, threadID, messageID, send, reply, react } = message;
    const anhbank = (await axios.get("https://i.imgur.com/m6A8phY.jpeg", {
      responseType: "stream"
    })).data;
    if (!args[0]) return message.reply({ body: `=== 「 ...SIES BANK... 」 ===\n»»» 𝐌𝐨̣̂𝐭 𝐬𝐨̂́ 𝐥𝐞̣̂𝐧𝐡 𝐡𝐢𝐞̣̂𝐧 𝐜𝐨́ 𝐭𝐫𝐞̂𝐧 𝐡𝐞̣̂ 𝐭𝐡𝐨̂́𝐧𝐠: \n\n» 1.𝙗𝙖𝙣𝙠 𝙙𝙖𝙣𝙜𝙠𝙞/-𝙧/𝙧: Để đăng kí tài khoản \n» 2.𝙗𝙖𝙣𝙠 𝙩𝙝𝙤𝙣𝙜𝙩𝙞𝙣/𝙘𝙝𝙚𝙘𝙠/-𝙘: Để xem thông tin tài khoản bản thân\n» 3.𝙗𝙖𝙣𝙠 𝙩𝙞𝙢/-𝙛 [𝙨𝙩𝙠/𝙞𝙙] [𝙨𝙤̂́ 𝙨𝙩𝙠/𝙞𝙙 𝙘𝙖̂̀𝙣 𝙩𝙞̀𝙢]: Để tìm tài khoản ngân hàng của ai đó\n» 4.𝙗𝙖𝙣𝙠 𝙧𝙪𝙩/𝙬𝙞𝙩𝙝𝙙𝙧𝙖𝙬/-𝙬 <𝙨𝙤̂́ 𝙩𝙞𝙚̂̀𝙣 𝙘𝙖̂̀𝙣 𝙧𝙪́𝙩>: Để rút tiền \n» 5.𝙗𝙖𝙣𝙠 𝙘𝙝𝙪𝙮𝙚𝙣𝙩𝙞𝙚𝙣/-𝙥 <𝙨𝙩𝙠/𝙞𝙙> <𝙨𝙤̂́ 𝙨𝙩𝙠/𝙞𝙙 𝙘𝙖̂̀𝙣 𝙘𝙝𝙪𝙮𝙚̂̉𝙣> <𝙨𝙤̂́ 𝙩𝙞𝙚̂̀𝙣 𝙘𝙖̂̀𝙣 𝙘𝙝𝙪𝙮𝙚̂̉𝙣>: Để chuyển tiền \n» 6.𝙗𝙖𝙣𝙠 𝙙𝙚𝙥𝙤𝙨𝙞𝙩/-𝙙/𝙣𝙖𝙥 <𝙨𝙤̂́ 𝙩𝙞𝙚̂̀𝙣 𝙘𝙖̂̀𝙣 𝙣𝙖̣𝙥>: Nạp tiền vào tài khoản \n» 7.𝙗𝙖𝙣𝙠 -𝙥𝙬/𝙥𝙖𝙨𝙨/𝙢𝙖𝙩𝙠𝙝𝙖𝙪 <𝙜𝙚𝙩𝙥𝙖𝙨𝙨>: lấy lại pass \n» 8.𝙗𝙖𝙣𝙠 -𝙥𝙬/𝙥𝙖𝙨𝙨/𝙢𝙖𝙩𝙠𝙝𝙖𝙪 <𝙜𝙚𝙩𝙣𝙚𝙬/𝙙𝙤𝙞𝙢𝙖𝙩𝙠𝙝𝙖𝙪/𝙣𝙚𝙬> : Đổi mật khẩu tài khoản SIES BANK của bạn\n» 9. 𝙗𝙖𝙣𝙠 𝙜𝙤𝙥𝙮/𝙨𝙪𝙜𝙜𝙜𝙚𝙨𝙩 <𝙣𝙤̣̂𝙞 𝙙𝙪𝙣𝙜> : Để góp ý giúp api tốt hơn`, attachment: anhbank });
    const checkBank = (await axios.get(`https://apifreebank001.siescute.repl.co/bank/check?ID=${message.senderID}`)).data
    const { Users } = global.controllers
    const name = (await global.controllers.Users.getInfo(message.senderID))?.name || message.senderID;
    switch (args[0]) {
      case 'dangki':
      case '-r':
      case 'r': {
        const res = (await axios.get(`https://apifreebank001.siescute.repl.co/bank/register?senderID=${senderID}&name=${encodeURI(`${name}`)}`)).data
        if (res.status == false) return message.reply(`[ 𝖘𝖎𝖊𝖘-🤖 ] »`, res.message);
        message.send('[ 𝖘𝖎𝖊𝖘-🤖 ] » Mật Khẩu Tài Khoản Ngân Hàng Sies Bank của bạn là: ' + res.message.password, message.senderID);
        return message.send(`[ 𝖘𝖎𝖊𝖘-🤖 ] » \n=== [ ${res.message.noti} ] ===\n👤 Chủ sở hữu: ${res.message.name}\n💳 STK: ${res.message.STK}\n💰 Số dư: ${res.message.money}$\n🔐  Password: đã được gửi đến inbox (nếu không nhận được vui lòng addfr bot và đặt lại mật khẩu)`);
      }
      case "tim":
      case "-f": {
        if (checkBank.status == false) message.reply("[ 𝖘𝖎𝖊𝖘-🤖 ] » Bạn chưa có tài khoản trên hệ thống!")
        if (args[1] != "stk" && args[1] != "id") {
          message.reply("[ 𝖘𝖎𝖊𝖘-🤖 ] » Vui lòng chọn đúng kiểu (stk/id)")
        }

        const res = (await axios.get(`https://apifreebank001.siescute.repl.co/bank/find?type=${args[1].toUpperCase()}&${args[1].toUpperCase()}=${args[2]}`)).data
        if (res.status == false) return message.reply(`[ 𝖘𝖎𝖊𝖘-🤖 ] » ${res.message}`);
        const name = res.message.name
        const stk = res.message.data.STK
        const soDu = res.message.data.money
        return message.reply(`[ 𝖘𝖎𝖊𝖘-🤖 ] »\n 👤 Chủ sở hữu: ${name}\n💳 STK: ${stk}\n💰 Số dư: ${soDu}$`)
      }
      case 'thongtin':
      case '-i':
      case 'check':
      case '-c': {
        if (checkBank.status == false) return message.reply('[ 𝖘𝖎𝖊𝖘-🤖 ] » Bạn chưa có tài khoản MDL Bank!');
        const res = (await axios.get(`https://apifreebank001.siescute.repl.co/bank/find?type=ID&ID=${message.senderID}`)).data
        return message.reply(`[ 𝖘𝖎𝖊𝖘-🤖 ] »\n👤 Chủ sỡ hữu: ${res.message.name}\n💳 STK: ${res.message.data.STK}\n💰 Số dư: ${res.message.data.money}$`)
      }
      case 'withdraw':
      case '-w':
      case 'rut': {
        if (checkBank.status == false) return message.reply('[ 𝖘𝖎𝖊𝖘-🤖 ] » Bạn chưa có tài khoản SIES Bank!');
        if (!args[1]) return message.reply('[ 𝖘𝖎𝖊𝖘-🤖 ] » Vui lòng nhập lệnh với : withdraw/-w/rut <số tiền cần rút>');
        message.reply('[ 𝖘𝖎𝖊𝖘-🤖 ] » Hãy hoàn tất bước cuối cùng ở mục INBOX với BOT (Nếu không có hãy check tin nhắn chờ hoặc hãy addfr bot)!');
        await message
          .send('[ 𝖘𝖎𝖊𝖘-🤖 ] » Vui lòng reply tin nhắn này và nhập mật khẩu tài khoản SIES Bank của bạn để rút tiền!', message.senderID)
          .then(data => {
            data.addReplyEvent({
              callback: handleReply,
              type: 'withdrawMoney',
              author_only: false,
              messID: message.messageID,
              money: args[1],
              tid: message.threadID
            })
          });
      }
      case 'chuyentien':
      case '-p': {
        if (checkBank.status == false) return message.reply('[ 𝖘𝖎𝖊𝖘-🤖 ] » Bạn chưa có tài khoản SIES Bank!');
        if (!args[1] || !args[2] || !args[3]) return message.reply('[ 𝖘𝖎𝖊𝖘-🤖 ] » Vui lòng nhập đúng lệnh: chuyentien/-p  stk/id <stk/id người nhận> <số tiền cần chuyển>');
        if (args[1] == 'stk') {
          message.reply('[ 𝖘𝖎𝖊𝖘-🤖 ] » Hãy hoàn tất bước cuối cùng ở mục INBOX với BOT (Nếu không có hãy check tin nhắn chờ hoặc hãy addfr bot)!');
          await message
            .send('[ 𝖘𝖎𝖊𝖘-🤖 ] » Vui lòng reply tin nhắn này và nhập mật khẩu tài khoản SIES Bank của bạn để chuyển tiền!', message.senderID)
            .then(data => {
              data.addReplyEvent({
                callback: handleReply,
                type: 'transferSTK',
                messID: message.messageID,
                author_only: false,
                STK: args[2],
                money: args[3],
                tid: message.threadID
              })
            });
        }
        if (args[1] == 'id') {
          if (checkBank.status == false) return message.reply('[ 𝖘𝖎𝖊𝖘-🤖 ] » Bạn chưa có tài khoản SIES Bank!');
          message.reply('[ 𝖘𝖎𝖊𝖘-🤖 ] » Hãy hoàn tất bước cuối cùng ở mục INBOX với BOT (Nếu không có hãy check tin nhắn chờ hoặc hãy addfr bot)!');
          await message
            .send('[ 𝖘𝖎𝖊𝖘-🤖 ] » Vui lòng reply tin nhắn này và nhập mật khẩu tài khoản SIES Bank của bạn để chuyển tiền!', message.senderID)
            .then(data => {
              data.addReplyEvent({
                callback: handleReply,
                type: 'transferID',
                messID: message.messageID,
                author_only: false,
                STK: args[2],
                money: args[3],
                tid: message.threadID
              })
            });
        }
        break;
      }
      case 'deposit':
      case '-d':
      case 'nap': {
        if (checkBank.status == false) return message.reply('[ 𝖘𝖎𝖊𝖘-🤖 ] » Bạn chưa có tài khoản SIES Bank!');
        if (!args[1]) return message.reply('[ 𝖘𝖎𝖊𝖘-🤖 ] » Vui lòng nhập số tiền cần nạp vào!\ndeposit/-d/nap <số tiền cần nạp>');
        var i = (await Users.getMoney(message.senderID) || null);
        var money = args[1];
        if (i < parseInt(money)) return message.reply('[ 𝖘𝖎𝖊𝖘-🤖 ] » Đell có tiền cũng đòi nạp , mua đá ở chỗ nào mà phê thế=)))');
        await Users.decreaseMoney(message.senderID, parseInt(money));
        const res = (await axios.get(`https://apifreebank001.siescute.repl.co/bank/send?senderID=${message.senderID}&money=${args[1]}`)).data
        return message.reply(`[ 𝖘𝖎𝖊𝖘-🤖 ] » [ ${res.message.noti} ]\n  » 💰 Số dư hiện tại của bạn trong ví: ${res.message.money} VNĐ`);
        break;
      }
      case 'pass':
      case 'matkhau':
      case '-pw': {
        if (checkBank.status == false) return message.reply('[ 𝖘𝖎𝖊𝖘-🤖 ] » Bạn chưa có tài khoản SIES Bank!');
        var type = args[1];
        switch (type) {
          case 'getpass': {
            const res = (await axios.get(`https://apifreebank001.siescute.repl.co/bank/password?bka=${type}&dka=${message.senderID}`)).data
            message.reply('[ 𝖘𝖎𝖊𝖘-🤖 ] » Mật khẩu của bạn được gửi đến INBOX hoặc tin nhắn chờ!');
            return message.send(`[ 𝖘𝖎𝖊𝖘-🤖 ] » Mật khẩu của bạn là: ${res.message.password}`, message.senderID);
          }
          case 'getnew':
          case 'doimatkhau':
          case 'new': {
            message.reply('[ 𝖘𝖎𝖊𝖘-🤖 ] » Hãy hoàn tất bước cuối cùng ở mục INBOX với BOT (Nếu không có hãy check tin nhắn chờ hoặc hãy addfr bot)!');
            await message
              .send('[ 𝖘𝖎𝖊𝖘-🤖 ] » Vui lòng reply tin nhắn này để nhập mật khẩu mới!', message.senderID)
              .then(data => {
                data.addReplyEvent({
                  callback: handleReply,
                  type: 'renewPass',
                  messID: message.messageID,
                  author_only: false,
                  tid: message.threadID
                })
              });
          }
        }
      }
      case 'suggest':
      case 'gopy': {
        if (checkBank.status == false) return message.reply('[ 𝖘𝖎𝖊𝖘-🤖 ] » Bạn chưa có tài khoản SIES Bank!');
        if (!args.slice(1).join(" ")) return message.reply('[ 𝖘𝖎𝖊𝖘-🤖 ] » Vui lòng nhập nội dung cần góp ý!');
        const res = (await axios.get(`https://apifreebank001.siescute.repl.co/gopy?senderID=${message.senderID}&suggest=${encodeURI(args.slice(1).join(" "))}`)).data
        if(res.status == false) return message.reply(`[ 𝖘𝖎𝖊𝖘-🤖 ] »` + res.message);
        return message.reply(`[ 𝖘𝖎𝖊𝖘-🤖 ] »` + res.message);
      }
        
      default: {
        return message.reply({ body: "=== 「 ...SIES BANK... 」 ===\n»»» 𝐌𝐨̣̂𝐭 𝐬𝐨̂́ 𝐥𝐞̣̂𝐧𝐡 𝐡𝐢𝐞̣̂𝐧 𝐜𝐨́ 𝐭𝐫𝐞̂𝐧 𝐡𝐞̣̂ 𝐭𝐡𝐨̂́𝐧𝐠: \n\n» 1.𝙗𝙖𝙣𝙠 𝙙𝙖𝙣𝙜𝙠𝙞/-𝙧/𝙧: Để đăng kí tài khoản \n» 2.𝙗𝙖𝙣𝙠 𝙩𝙝𝙤𝙣𝙜𝙩𝙞𝙣/𝙘𝙝𝙚𝙘𝙠/-𝙘: Để xem thông tin tài khoản bản thân\n» 3.𝙗𝙖𝙣𝙠 𝙩𝙞𝙢/-𝙛 [𝙨𝙩𝙠/𝙞𝙙] [𝙨𝙤̂́ 𝙨𝙩𝙠/𝙞𝙙 𝙘𝙖̂̀𝙣 𝙩𝙞̀𝙢]: Để tìm tài khoản ngân hàng của ai đó\n» 4.𝙗𝙖𝙣𝙠 𝙧𝙪𝙩/𝙬𝙞𝙩𝙝𝙙𝙧𝙖𝙬/-𝙬 <𝙨𝙤̂́ 𝙩𝙞𝙚̂̀𝙣 𝙘𝙖̂̀𝙣 𝙧𝙪́𝙩>: Để rút tiền \n» 5.𝙗𝙖𝙣𝙠 𝙘𝙝𝙪𝙮𝙚𝙣𝙩𝙞𝙚𝙣/-𝙥 <𝙨𝙩𝙠/𝙞𝙙> <𝙨𝙤̂́ 𝙨𝙩𝙠/𝙞𝙙 𝙘𝙖̂̀𝙣 𝙘𝙝𝙪𝙮𝙚̂̉𝙣> <𝙨𝙤̂́ 𝙩𝙞𝙚̂̀𝙣 𝙘𝙖̂̀𝙣 𝙘𝙝𝙪𝙮𝙚̂̉𝙣>: Để chuyển tiền \n» 6.𝙗𝙖𝙣𝙠 𝙙𝙚𝙥𝙤𝙨𝙞𝙩/-𝙙/𝙣𝙖𝙥 <𝙨𝙤̂́ 𝙩𝙞𝙚̂̀𝙣 𝙘𝙖̂̀𝙣 𝙣𝙖̣𝙥>: Nạp tiền vào tài khoản \n» 7.𝙗𝙖𝙣𝙠 -𝙥𝙬/𝙥𝙖𝙨𝙨/𝙢𝙖𝙩𝙠𝙝𝙖𝙪 <𝙜𝙚𝙩𝙥𝙖𝙨𝙨>: lấy lại pass \n» 8.𝙗𝙖𝙣𝙠 -𝙥𝙬/𝙥𝙖𝙨𝙨/𝙢𝙖𝙩𝙠𝙝𝙖𝙪 <𝙜𝙚𝙩𝙣𝙚𝙬/𝙙𝙤𝙞𝙢𝙖𝙩𝙠𝙝𝙖𝙪/𝙣𝙚𝙬> : Đổi mật khẩu tài khoản SIES BANK của bạn\n» 9. 𝙗𝙖𝙣𝙠 𝙜𝙤𝙥𝙮/𝙨𝙪𝙜𝙜𝙜𝙚𝙨𝙩 <𝙣𝙤̣̂𝙞 𝙙𝙪𝙣𝙜> : Để góp ý giúp api tốt hơn", attachment: anhbank });
      }

    }





  } catch (e) {
    message.send("Error :", e);
    console.error(e);
  }

}

async function handleReply({ message, eventData, data }) {
  try {
    const { senderID, threadID, messageID, send, reply, react } = message;
    const { Users } = global.controllers
    switch (eventData.type) {
      case 'withdrawMoney': {
        const res = (await axios.get(`https://apifreebank001.siescute.repl.co/bank/get?ID=${message.senderID}&money=${eventData.money}&password=${message.body}`)).data
        if (res.status == false) return message.send(res.message);
        await Users.increaseMoney(message.senderID, parseInt(eventData.money));
        message.send(`[ 𝖘𝖎𝖊𝖘-🤖 ] » [ ${res.message.noti} ]\n👤 Chủ tài khoản: ${res.message.name}\n💰 Số dư còn lại: ${res.message.money}`);
        return message.reply(`[ 𝖘𝖎𝖊𝖘-🤖 ] » ${res.message.noti}\n👤 Chủ tài khoản: ${res.message.name}\n💰 Số dư còn lại: ${res.message.money}\n __${res.message.cre}__`, eventData.tid);
      }
      case 'transferSTK': {
        const res = (await axios.get(`https://apifreebank001.siescute.repl.co/bank/pay?type=STK&senderID=${message.senderID}&STK=${eventData.STK}&money=${eventData.money}&password=${message.body}`)).data
        if (res.status == false) return message.send(res.message);
        message.reply(`[ 𝖘𝖎𝖊𝖘-🤖 ] » [ ${res.message.noti} ]\n ${res.message.data.message}`);
        return message.send(`[ 𝖘𝖎𝖊𝖘-🤖 ] » [ ${res.message.noti} ]\n\n${res.message.data.message}`, eventData.tid);
      }
      case 'transferID': {
        const res = (await axios.get(`https://apifreebank001.siescute.repl.co/bank/pay?type=ID&senderID=${message.senderID}&userID=${eventData.ID}&money=${eventData.money}&password=${message.body}`)).data
        if (res.status == false) return message.send(res.message);
        message.reply(`[ 𝖘𝖎𝖊𝖘-🤖 ] » [ ${res.message.noti} ]\n ${res.message.data.message}`);
        return message.send(`[ 𝖘𝖎𝖊𝖘-🤖 ] » [ ${res.message.noti} ]\n\n${res.message.data.message}`, eventData.tid);
      }
      case 'renewPass': {
        const res = (await axios.get(`https://apifreebank001.siescute.repl.co/bank/password?bka=recovery&dka=${message.senderID}&fka=${message.body}`)).data
        if (res.status == false) return message.send(res.message);
        message.send(`[ 𝖘𝖎𝖊𝖘-🤖 ] » [ ${res.message.noti} ]\nChủ tài khoản: ${res.message.name}`, eventData.tid);
        return message.send(`[ 𝖘𝖎𝖊𝖘-🤖 ] » Thay đổi mật khẩu thành công!\nMật khẩu hiện tại: ${res.message.password}`)
      }


    }
  } catch (e) {
    message.send("Error :", e);
    console.error(e);
  }



}

export default {
  config,
  onCall,
  handleReply
}

// or
// export {
//     config,
//     langData,
//     onCall
// }
