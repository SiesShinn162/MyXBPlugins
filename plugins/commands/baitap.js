import axios from 'axios';
const config = {
    name: "baitap",
    aliases: ["bt"],
    description: "Chỉ là lệnh giải bài tập mà thôi",
    usage: "[query]",
    cooldown: 3,
    permissions: [0, 1, 2],
    isAbsolute: false,
    isHidden: false,
    credits: "Sies",
    
}

const langData = {
    "lang_1": {
        "message": "This is an example message",
    },
    "lang_2": {
        "message": "This is an example message",
    }
}

async function onCall({ message, args, getLang, extra, data, userPermissions, prefix }) {
    // Do something
  try{
    const body = args.join(' ');
    axios.post('https://qa-honeycomb.giainhanh.io/api/search-text' , {
            content: body
        })  
        .then(res => {
            var data = [];
            var links = [];
            for(let i of res.data.data) {
                if(i.question.content != null && i.best_answer.content != null) {
                    var qs = i.question.content.replace(/<\/?[^>]+(>|$)/g, "").trimEnd()
                    var an = i.best_answer.content.replace(/<\/?[^>]+(>|$)/g, "").trimEnd()
                    data.push({
                        question: filterHTML(qs),
                        ans: filterHTML(an)
                    })
                }
            }
            for(let i of res.data.data) {
                if(i.question.content == null || i.best_answer.content == null) {
                    //các câu hỏi và trả lời dạng ảnh
                }
            }
          var msg = `=====KẾT QUẢ TÌM ĐƯỢC=====\n\n`
          for(let i =0; i < 3; i++) {
                msg += ` 𝐂𝐚̂𝐮 𝐡𝐨̉𝐢: ${data[i].question}\n\n 𝐂𝐚̂𝐮 𝐭𝐫𝐚̉ 𝐥𝐨̛̀𝐢: ${data[i].ans}\n\n`
            }
          return message.reply(msg.trim());
        })
  function filterHTML(i) {
    var data = i.trim()
            .replace('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n', '\n')
            .replace('\n\n\n\n\n\n\n\n\n\n\n\n\n\n', '\n')
            .replace('\n\n\n\n\n\n\n\n\n\n\n\n\n', '\n')
            .replace('\n\n\n\n\n\n\n\n\n\n\n\n', '\n')
            .replace('\n\n\n\n\n\n\n\n\n\n\n', '\n')
            .replace('\n\n\n\n\n\n\n\n\n\n', '\n')
            .replace('\n\n\n\n\n\n\n\n\n', '\n')
            .replace('\n\n\n\n\n\n\n\n', '\n')
            .replace('\n\n\n\n\n\n\n', '\n')
            .replace('\n\n\n\n\n\n', '\n')
            .replace('\n\n\n\n\n', '\n')
            .replace('\n\n\n\n', '\n')
            .replace('\n\n\n', '\n')
            .replace('\n\n', '\n')
            .replace('\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r', '\r')
            .replace('\r\r\r\r\r\r\r\r\r\r\r\r\r\r', '\r')
            .replace('\r\r\r\r\r\r\r\r\r\r\r\r\r', '\r')
            .replace('\r\r\r\r\r\r\r\r\r\r\r\r', '\r')
            .replace('\r\r\r\r\r\r\r\r\r\r\r', '\r')
            .replace('\r\r\r\r\r\r\r\r\r\r', '\r')
            .replace('\r\r\r\r\r\r\r\r\r', '\r')
            .replace('\r\r\r\r\r\r\r\r', '\r')
            .replace('\r\r\r\r\r\r\r', '\r')
            .replace('\r\r\r\r\r\r', '\r')
            .replace('\r\r\r\r\r', '\r')
            .replace('\r\r\r\r', '\r')
            .replace('\r\r\r', '\r')
            .replace('\r\r', '\r')
    return data
        }
          }
            catch(e){
              message.send(e);
              console.log(e);
          }
  
  }

  


  


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
