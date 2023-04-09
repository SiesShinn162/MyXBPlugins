import { Configuration, OpenAIApi } from "openai";
import { existsSync, writeFileSync, readFileSync } from "fs";
import { join } from "path";
import { CronJob } from 'cron';;
const config = {
  name: "aiv2",
  aliases: ["chatgpt"],
  description: "ChatGPT cũng không biết ư , cute v:>",
  usage: "<prefix>ai [câu hỏi]",
  cooldown: 3,
  permissions: [0, 1, 2],
  isAbsolute: false,
  isHidden: false,
  credits: "Sies",

}

const langData = {
  "vi_VN": {
    "ai.error": "Xin lũi , đang có trục chặc tý:((",
  },
  "en_US": {
    "ai.error": "Sorry, there was an error processing your request.",
  }
}
const PATH2 = join(global.assetsPath, 'giftcodes.json');
if (!existsSync(PATH2)) {
  writeFileSync(PATH2, "[]", "utf-8");
}
function RamdomGC(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function createGC01(code, usagesz, point) {
  // Đọc dữ liệu từ file json
  const data = JSON.parse(readFileSync(PATH2));

  // Kiểm tra nếu giftcode đã tồn tại
  const existingCode = data.find((item) => item.code === code);
  if (existingCode) {
    throw new Error('Giftcode đã tồn tại.');
  }

  // Thêm giftcode mới vào danh sách
  data.push({ code, usagesz, point });

  // Lưu lại dữ liệu vào file json
  writeFileSync(PATH2, JSON.stringify(data, null, 2));

  console.log(`Giftcode ${code} đã được tạo thành công.`);
}
function createGC02(quantity, usagesz, point) {
  const data = JSON.parse(readFileSync(PATH2));
  for (let i = 0; i < quantity; i++) {
    const code = 'Siesgftfree-' + RamdomGC(8);
    data.push({ code, usagesz, point });
  }
  writeFileSync(PATH2, JSON.stringify(data, null, 2));
}
// Hàm kiểm tra giftcode và trả về số lượt dùng còn lại của giftcode đó
function checkGC(code) {
  // Đọc dữ liệu từ file json
  const data = JSON.parse(readFileSync(PATH2));
  // Tìm giftcode trong danh sách
  const giftcode = data.find((item) => item.code === code);
  if (!giftcode) {
    return 'Giftcode không hợp lệ.';
  }

  // Kiểm tra số lượt dùng còn lại của giftcode
  if (giftcode.usagesz <= 0) {
    return 'Giftcode đã hết lượt dùng.';
  }


  // Trả về số lượt dùng còn lại của giftcode
  return `Số lượt sử dụng còn lại : ${giftcode.usagesz} , Số lượt dùng cộng thêm : ${giftcode.point}`;
}

async function onCall({ message, args, getLang, extra, data, code, usagesz }) {
  // Do something
  try {
    const { Users } = global.controllers
    const PATH = join(global.assetsPath, 'luotdung.json');
    const PATH2 = join(global.assetsPath, 'giftcodes.json');
    const data = JSON.parse(readFileSync(PATH2));
    const money = await Users.getMoney(message.senderID);
    if (!existsSync(PATH)) return writeFileSync(PATH, "[]", "utf-8");
    const { senderID, threadID, messageID, send, reply, react } = message;
    var dataJson = JSON.parse(readFileSync(PATH, "utf-8"));
    var userData = dataJson.find(item => item.senderID == message.senderID) || { senderID: senderID, usages: 5, rank: "Đồng" };
    const jobby = new CronJob('00 */3 * * *', async () => {
      const { Users } = global.controllers;
      const PATH = join(global.assetsPath, 'luotdung.json');
      const dataJson = JSON.parse(readFileSync(PATH, "utf-8"));
      const userData = dataJson.find(item => item.senderID == message.senderID);
      if (userData.rank === 'Đồng') {
        userData.usages += 5;
      } else if (userData.rank === 'Bạc') {
        userData.usages += 15;
      } else if (userData.rank === 'Vàng') {
        userData.usages += 35;
      } else if (userData.rank === 'Ruby') {
        userData.usages += 75;
      } else if (userData.rank === 'Premium') {
        userData.usages += 500;
      }
      // Save the updated user's data
      writeFileSync(PATH, JSON.stringify(dataJson, null, 4), "utf-8");
      message.send(`[ SIES-NOTI ] » Đã thêm lượt dùng cho tất cả mọi người!`);
    }, null, true, "Asia/Ho_Chi_Minh");
     if (!args[0]) return message.reply(`======= ChatGPT System =====\n\n--REGISTER HELP--\n\n» 1.-r: Tạo tài khoản sử dụng ChatGPT System!\n\n--CHECK HELP--\n\n» 1.-c : Kiểm tra các dữ liệu có trong tài khoản!\n\n--BUYING HELP--\n\n» 1. -p <rank hoặc giftcode> : Mua rank hoặc giftcode hiện có!\n\n--GIFTCODE HELP--\n\n-----(ADMIN ONLY!)----\n\n» 1.-gc taogc <input> <lượt dùng> <lượt sử dụng>: Tạo giftcode thủ công\n» 2.-gc taordgc <số lượng> <lượt dùng> <lượt sử dụng>: Tạo số giftcode theo mong muốn\n-----------\n\n» 3. -gc checkgc <input> : Kiểm tra giftcode\n » 4. -gc redeem <input> : sử dụng giftcode!\n=============`);
    if (args[0] == '-r' || args[0] == 'dangki') {
      if (!dataJson.some(i => i.senderID == message.senderID)) {
        dataJson.push(userData);
        writeFileSync(PATH, JSON.stringify(dataJson, null, 4), "utf-8");
        return message.reply(`[ SIES-NOTI ] » Bạn đã đăng kí thành công dịch vụ chatGPT, Bạn được nhận 5 lượt dùng miễn phí!`)
      }
      else return message.reply(`[ SIES-NOTI ] » Bạn đã đăng kí dịch vụ trên hệ thống!`);
    } else if (args[0] == 'check' || args[0] == '-c') {
      if (dataJson.some(i => i.senderID == message.senderID) == false) return message.reply(`[ SIES-NOTI ] » Bạn chưa đăng kí dịch vụ , hãy đăng kí!`);
      else {
        var luotdung = userData.usages;
        var yourank = userData.rank;
        const now = Date.now();
        const remaining = jobby.nextDate() - Date.now();
        const hours = Math.floor(remaining / (1000 * 60 * 60));
        const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
        return message.reply(`[ SIES-NOTI ] » Bạn còn ${luotdung} lượt dùng\n» Rank của bạn là : ${yourank}\n» Thời gian hiện tại còn ${hours} giờ ,  ${minutes} phút , ${seconds} giây để cập nhật lượt dùng.`);
      }
    }
    else if (args[0] == '-p' || args[0] == 'pay') {
      if (dataJson.some(i => i.senderID == message.senderID) == false) return message.reply(`[ SIES-NOTI ] » Bạn chưa đăng kí dịch vụ , hãy đăng kí!`);
      else {
        var yourank = userData.rank;
        const money = await Users.getMoney(message.senderID);
        if (!args[1]) return message.send(`======BUYING AREA=====\n\n--RANK PRICE LIST--\n\n=» "Bạc" : 125000 XC + 15 lượt/day\n=» "Vàng" :  325000 XC + 35 lượt/day\n=» "Ruby" : 725000 XC + 70 lượt/day\n=» "Premium" :  11999000 XC + 500 lượt/day\n\n=========\n=» Rank hiện tại của bạn là : ${yourank}\n------------\n--GIFTCODE PRICE LIST--\n=» Coming soon!`);
        else {
          const ranks = {
            "Đồng": { price: 75000, usages: 5 },
            "Bạc": { price: 125000, usages: 15 },
            "Vàng": { price: 325000, usages: 35 },
            "Ruby": { price: 725000, usages: 70 },
            "Premium": { price: 11999000, usages: 500 },
          };

          const rankName = args[1];
          const rankInfo = ranks[rankName];
          if (!rankInfo) {
            return message.reply(`[ SIES-NOTI ] » Rank không hợp lệ!`);
          }

          if (money < rankInfo.price) {
            return message.reply(`[ SIES-NOTI ] » Số dư không đủ để mua rank ${rankName}!`);
          }
          userData.rank = rankName;
          userData.usages += rankInfo.usages;
          message.reply(`[ SIES-NOTI ] » Cám ơn bạn đã mua rank, Rank hiện tại của bạn là ${rankName}!`);
          await Users.decreaseMoney(message.senderID, rankInfo.price);
          writeFileSync(PATH, JSON.stringify(dataJson, null, 4), "utf-8");
        }
      }
    }
    else if (args[0] == '-gc' || args[0] == 'giftcodes') {
      if (dataJson.some(i => i.senderID == message.senderID) == false) return message.reply(`[ SIES-NOTI ] » Bạn chưa đăng kí dịch vụ , hãy đăng kí!`);
      else {
        const gc = args[2];
        const usgc = parseInt(args[3]);
        const pgc = parseInt(args[4]);
        if (!args[1]) return message.reply(`=====GIFTCODE ======\n »» Các lệnh giftcode hiện tại: \n -----(ADMIN ONLY!)----\n\n» 1.-gc taogc <input> <lượt dùng> <lượt sử dụng>: Tạo giftcode thủ công\n» 2.-gc taordgc <số lượng> <lượt dùng> <lượt sử dụng>: Tạo số giftcode theo mong muốn\n-----------\n\n» 3. -gc checkgc <input> : Kiểm tra giftcode\n » 4. -gc redeem <input> : sử dụng giftcode!`);
        if (!isAbsolute) return message.reply(`[ SIES-NOTI ] » Bạn không phải QTV!`);
        else {
          if (args[1] == 'taogc') {
            if (isNaN(usgc || pgc)) {
              return message.reply(`[ SIES-NOTI ] » Lượt sử dụng hay lượt dùng không hợp lệ`);
            }
            createGC01(gc, usgc, pgc);
            message.reply(`[ SIES-NOTI ] » Giftcode ${gc} đã được tạo thành công với số lượt sử dụng là : ${usgc} và số lượt dùng là : ${pgc}!`);
          }
          if (args[1] == 'taordgc') {
            if (isNaN(gc || usgc || pgc)) {
              return message.reply(`[ SIES-NOTI ] » Lượt sử dụng hay lượt dùng  hay số lượng không hợp lệ`);
            }
            createGC02(gc, usgc, pgc);
            message.reply(`[ SIES-NOTI ] » Giftcode đã được tạo thành công với số lượt sử dụng là : ${usgc} ,  số lượt dùng là : ${pgc} với số lượng : ${gc}!`);
          }
        }
        if (args[1] == 'checkgc') {
          message.send(checkGC(gc));
        }
        if (args[1] == 'redeem') {
          const gc = args[2];
          const data = JSON.parse(readFileSync(PATH2));
          const giftcode = data.find(item => item.code === gc);
          const dataJson = JSON.parse(readFileSync(PATH, "utf-8"));
          const userData = dataJson.find(item => item.senderID == message.senderID);
          if (!giftcode) {
            return message.reply(' [ SIES-NOTI ] » Giftcode không hợp lệ.');
          }
          if (giftcode.usagesz <= 0) {
            return message.reply('[ SIES-NOTI ] » Giftcode đã hết lượt dùng.');
          }
          giftcode.usagesz--;
          userData.usages += giftcode.point;
          writeFileSync(PATH2, JSON.stringify(data, null, 2));
          writeFileSync(PATH, JSON.stringify(dataJson, null, 4), "utf-8");
          return message.reply(`[ SIES-NOTI ] » Chúc mừng bạn đã sử dụng giftcode thành công, hãy dùng lệnh check để xem số lượt dùng của bạn hiện tại`);
        }
      }
    }
    else {
      if (dataJson.some(i => i.senderID == message.senderID) == false) return message.reply(`[ SIES-NOTI ] » Bạn chưa đăng kí dịch vụ , hãy đăng kí!`);
      else {
        if (userData.usages <= 0) {
          const now = Date.now();
          const remaining = jobby.nextDate() - Date.now();
          const hours = Math.floor(remaining / (1000 * 60 * 60));
          const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
          return message.reply(`[ SIES-NOTI ] » Số lần sử dụng của bạn đã hết, mỗi ngày chỉ có 5 lượt dùng , vì vậy hãy chờ hoặc nâng cấp mức rank của bạn để tiếp tục sử dụng dịch vụ.\n» Thời gian cập nhật lượt dùng mới là mỗi 3h , hiện tại còn ${hours} giờ , ${minutes} phút ,  ${seconds} giây để cập nhật lượt dùng.`);
        } else {
          userData.usages -= 1;
        }
        writeFileSync(PATH, JSON.stringify(dataJson, null, 4), "utf-8");
        const ans = args.join(" ");
        var luotdung = userData.usages;
        const configuration = new Configuration({
          apiKey: process.env.OPENAI_API_KEY,
          organization: process.env.ORGANIZATION_ID
        });
        const openai = new OpenAIApi(configuration);
        const completion = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: `${ans}` }],
          max_tokens: 4000,
        });
        message.send({ body: completion.data.choices[0].message.content + `\n\n=========\n=» Còn ${luotdung} lượt dùng` });
      }



    }
  } catch (e) {
    console.error(e);
    message.send(getLang("ai.error") + e);
  }

}

// args: Arguments, if /example 1 2 3, args = ["1", "2", "3"]
// getLang: Get language from langData
// extra: Extra property from config.plugins.json
// data {  user, thread }
// userPermissions: User permissions (0: Member, 1: Admin, 2: Bot Admin)
// prefix: Prefix used


export default {
  config,
  langData,
  onCall
}

// or
// export {
//     config,
//     langData,
//     onCall
// }
