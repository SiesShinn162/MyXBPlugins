const laisuat = 0.015
const timeIM = 6000
import { join  , resolve } from 'path';
import { existsSync , writeFileSync , readFileSync } from "fs";
import moment from "moment-timezone";
const config = {
    name: "sbank",
    aliases: ["sbv1"],
    description: "1 cái ngân hàng nho nhỏ!",
    usage: "dùng đi rồi biết á",
    cooldown: 3,
    permissions: [0, 1, 2],
    isAbsolute: false,
    isHidden: false,
    credits: "Sies",
    
}


async function onCall({ message, args, getLang, extra, data, userPermissions, prefix }) {
    // Do something
  try{
    const {  senderID , threadID, messageID, send, reply, react } = message;
  const PATH = join(global.assetsPath, 'bank.json');
  const img = reader(join(global.assetsPath, 'anhbank.jpg'));
  const { Users } = global.controllers;
  var timeNow = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss");    
  console.log(timeNow)
  var seconds = moment.tz("Asia/Ho_Chi_Minh").format("ss");
  if (!existsSync(PATH)) return writeFileSync(PATH, "[]", "utf-8");
  const user = (args.slice(1, args.length)).join(" ");
  var dataJson = JSON.parse(readFileSync(PATH, "utf-8"));
  var userData = dataJson.find(item => item.senderID == message.senderID) || { senderID: senderID,  money: 0 };
  const moneyInput = parseInt(args[1])
  if(args[0] == '-r' || args[0] == 'dangki') {
        if (!dataJson.some(i => i.senderID == message.senderID)) {
        dataJson.push(userData);
        writeFileSync(PATH, JSON.stringify(dataJson, null, 4), "utf-8");
  return message.reply(`[ SIES-NOTI ] » Bạn đã đăng kí thành công, gửi ít nhất 5000$ để có lãi💰`)}
        else return message.reply(`[ SIES-NOTI ] » Bạn đã có tài khoản trên hệ thống Sies Bank !`);
}
        
  if(args[0] == 'check' || args[0] == 'ví') {
    if (dataJson.some(i => i.senderID == senderID) == false) return message.reply(`[ SIES-NOTI ] » Bạn không có tài khoản trên hệ thống Sies Bank , hãy đăng kí!`);
    else {
       var userMoney = userData.money;
       return message.reply(`[ SIES-NOTI ] » Số tiền bạn đang gửi trong Sies Bank là: ${userMoney}$\n💷 Lãi: +${laisuat}% trong ${timeIM/60} phút`)
    }
  }
  if(args[0] == 'gửi' || args[0] == 'send') {
    if (!args[1] || isNaN(args[1]) || parseInt(args[1]) < 5000) return message.reply("[ SIES-NOTI ] » Số tiền cần gửi phải là 1 con số và lớn hơn 5000$💰")
    if (!dataJson.some(i => i.senderID == senderID)) {
        return message.reply(`[ SIES-NOTI ] » Bạn không có tài khoản trên hệ thống Sies Bank, hãy đăng kí!`);
    }
    else { 
        console.log(userData);
        console.log(userData.money)
        const moneyy = await Users.getMoney(message.senderID);
        if(moneyy < moneyInput) return message.reply(`[ SIES-NOTI ] » Số dư không đủ ${moneyInput} để gửi vào Sies Bank💰 `)
        var money = userData.money;
        userData.money = parseInt(money) + parseInt(moneyInput);
        writeFileSync(PATH, JSON.stringify(dataJson, null, 4), "utf-8");
        await Users.decreaseMoney(message.senderID, parseInt(moneyInput))
        return message.reply(`[ SIES-NOTI ] » Bạn đã gửi ${moneyInput}$ vào Sies Bank\n💷 Lãi: +${laisuat}% trong ${timeIM/60} phút`)
        }
    }
  if(args[0] == 'rút' || args[0] == 'lấy') { 
        if (!args[1] || isNaN(args[1]) || parseInt(args[1]) < 5000) return message.reply("[ SIES-NOTI ] » Số tiền cần rút phải là 1 con số và lớn hơn 50$");
        if (!dataJson.some(i => i.senderID == senderID)) {
        return message.reply('[ SIES-NOTI ] » Người dùng chưa đăng kí sử dụng banking, banking register để đăng kí')
        }
    else {  
        
        var money = userData.money;
        if(parseInt(money) < parseInt(moneyInput)) return message.reply('[ SIES-NOTI ] » Số dư của bạn không đủ để thực hiện giao dịch này!')
        else {
            await Users.increaseMoney(message.senderID, parseInt(moneyInput))
            userData.money = parseInt(money) - parseInt(moneyInput)
            writeFileSync(PATH, JSON.stringify(dataJson, null, 4), "utf-8");
            return message.reply(`[ SIES-NOTI ] » Rút thành công ${parseInt(moneyInput)}$, số dư còn lại là : ${parseInt(money) - parseInt(moneyInput)}$`)
        }
        }
    }
  else {
    var msg = {body: `=====𝐒𝐢𝐞𝐬 𝐁𝐚𝐧𝐤🏦=====\n\n=»Chào mừng tới hệ thống 𝐒𝐢𝐞𝐬 𝐁𝐚𝐧𝐤 của chúng tôi! , Tại đây chúng tôi có các dịch vụ:\n\n=» 1.[-r/register] - Đăng kí gửi tiền tại 𝐒𝐢𝐞𝐬 𝐁𝐚𝐧𝐤💹\n=» 2.[check/ví] - Xem số tiền trong 𝐒𝐢𝐞𝐬 𝐁𝐚𝐧𝐤💳\n=» 3.[gửi/send] - Gửi tiền vào 𝐒𝐢𝐞𝐬 𝐁𝐚𝐧𝐤💷\n=» 4.[rút] - Rút tiền từ 𝐒𝐢𝐞𝐬 𝐁𝐚𝐧𝐤💰\n\n💲==» Lãi suất hiện tại của bạn: +${laisuat}% trong ${timeIM/60} phút` , attachment: img}
    return message.send(msg)}
  
  }catch(e){
    message.send("Error :" , e); 
    console.error(e);}
  


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
