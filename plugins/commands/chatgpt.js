import { Configuration, OpenAIApi } from "openai";
const config = {
  name: "chatgpt",
  aliases: ["ai"],
  description: "ChatGPT cũng không biết ư , cute v:>",
  usage: "<prefix>ai [câu hỏi]",
  cooldown: 15,
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

async function onCall({ message, args, getLang, extra, data }) {
  // Do something
  try {
    const { threadID, messageID, send, reply, react } = message;
    const ans = args.join(" ");  
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
      organization: process.env.ORGANIZATION_ID
    });
    const openai = new OpenAIApi(configuration);
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: `${ans}`}],
      max_tokens:4000,
});
    message.send({body : completion.data.choices[0].message.content});
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
  onCall
}

