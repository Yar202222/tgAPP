const TelegramBot = require('node-telegram-bot-api');

const token = '8056836648:AAGFme_c_P9IOHZ6B4t02osHgyJ9NLr1sU0'; //YOUR_BOT_TOKEN
const webAppUrl = '';//YOUR_WEB_APP_URL

const bot = new TelegramBot(token, { polling: true });

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === '/start') {
        await bot.sendMessage(chatId, 'Привет! Нажми кнопку, чтобы открыть Mini App:', {
            reply_markup: {
                inline_keyboard: [[{ text: 'Открыть Mini App', web_app: { url: webAppUrl } }]]
            }
        });
    }

    // Обработка данных, полученных из Mini App
    if (msg?.web_app_data?.data) {
        try {
            const data = JSON.parse(msg?.web_app_data?.data);
            await bot.sendMessage(chatId, `Вы отправили: ${data.feedback}`);
        } catch (error) {
            console.error("Ошибка при обработке данных из Mini App:", error);
            await bot.sendMessage(chatId, "Произошла ошибка при обработке вашего отзыва.");
        }
    }
});

console.log('Бот запущен...');