require('dotenv').config();
const Eris = require("eris");
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
const openai = new OpenAIApi(configuration);
const bot = new Eris(process.env.DISCORD_BOT_TOKEN, {
    intents: [
        "guildMessages"
    ]
});


async function runCompletion (message) {
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: message,
        max_tokens: 2048,
    });
    return completion.data.choices[0].text;
}


bot.on("ready", () => { 
    console.log("Bot is connected and ready!"); 
    bot.editStatus("online", {name: "моцарта", type: 2}); //type 1 - играет, 2 - слушает
});


bot.on("error", (err) => {
  console.error(err); 
});


bot.on("messageCreate", async (msg) => {
    if(msg.content.startsWith("?")) {
        let result = await runCompletion(msg.content.substring(1));
        bot.createMessage(msg.channel.id, result);
    } 
});

bot.connect();