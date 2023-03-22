# README

Данный проект позволяет создать Discord-бота, который использует OpenAI для генерации текста.

## Установка
1. Клонируйте репозиторий в нужную папку на вашем компьютере.
2. В корневой папке проекта создайте файл `.env`.
3. В файле `.env` добавьте следующие строки: 
```
OPENAI_API_KEY = "ваш_ключ_API_OpenAI", 
DISCORD_BOT_TOKEN = "ваш_токен_бота_discord"
```
4. Установите зависимости с помощью команды `npm install`.

## Использование
1. Запустите бота с помощью команды `node bot.js`.
2. Бот будет отвечать на сообщения, начинающиеся с символа `?`, выполняя генерацию текста на базе сообщения пользователя с помощью API OpenAI.
3. Результат генерации текста будет отправлен обратно в тот же канал чата, откуда получен запрос.

## Зависимости
- dotenv: "^10.0.0"
- eris: "^0.15.0"
- openai: "^2.5.0" 

## Код
```javascript
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
    ]\n});\n\nasync function runCompletion (message) {
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: message,
        max_tokens: 2048,
    });
    return completion.data.choices[0].text;
}\n\nbot.on("ready", () => { 
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
```