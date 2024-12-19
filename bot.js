const { Telegraf, Markup } = require('telegraf');
const express = require('express');
const bodyParser = require('body-parser');

const token = '8174559379:AAHOkleC4FAVMbeOWZ2NLPFqzrQHydrX4I8';
const GAME_URL = 'https://be1-game-telegram.game.webdevprojects.cloud.game.webdevprojects.cloud/';

const bot = new Telegraf(token);
const app = express();
const port = 3027;

app.use(bodyParser.json());

// Handle /start command with referral
bot.command('start', async (ctx) => {
  try {
    // Get the referral code from the start command if it exists
    const startPayload = ctx.message.text.split(' ')[1];

    // Construct the game URL with the referral code using the new format
    const gameUrl = startPayload
      ? `${GAME_URL}?tgWebAppStartParam=${startPayload}`
      : GAME_URL;

    await ctx.replyWithMarkdown(
      `🎮 *be1games.com* 🎮\n\n`  +
      `🕹️ Dive into a world of thrilling games for all ages.\n`  +
      `🌟 Play, compete, and unlock endless fun!\n`  +
      `🏆 Master challenges and top the leaderboards.\n`  +
      `🚀 Fresh games added regularly—adventure awaits!\n`,
      Markup.inlineKeyboard([
        Markup.button.webApp('START', gameUrl)
      ])
    );
  } catch (error) {
    console.error('Error in start command:', error);
    ctx.reply('Sorry, something went wrong. Please try again.');
  }
});

// Webhook route for Telegram
app.post(`/bot${token}`, (req, res) => {
  bot.handleUpdate(req.body);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Express server is running on port ${port}`);
});

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

// Set up webhook
const url = 'https://be1games-bot.game.webdevprojects.cloud/bot' + token;
bot.telegram.setWebhook(url);