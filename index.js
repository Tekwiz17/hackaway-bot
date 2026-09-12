const { App, ExpressReceiver } = require('@slack/bolt');
require('dotenv').config();

// 1. Initialize the Express Receiver to handle HTTP webhooks explicitly
const receiver = new ExpressReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  endpoints: '/slack/events'
});

// 2. Initialize the App using that custom receiver
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  receiver: receiver
});

// A simple root route to keep Render's health checks happy without breaking Slack
receiver.router.get('/', (req, res) => {
  res.send('Hackaway Slack Bot is up and running!');
});

// Helper for parsing slash command arguments
const getArgs = (text) => text ? text.trim() : '';

// ==========================================
// 🎮 CATEGORY 1: FUN & GAMES
// ==========================================

// 1. Coinflip
app.command('/hackaway-coinflip', async ({ command, ack, say }) => {
  await ack();
  const result = Math.random() < 0.5 ? 'Heads 🪙' : 'Tails 🪙';
  await say(`<@${command.user_id}> flipped a coin: *${result}*`);
});

// 2. Dice Roller
app.command('/hackaway-dice', async ({ command, ack, say }) => {
  await ack();
  const args = getArgs(command.text);
  const sides = parseInt(args) || 6;
  const roll = Math.floor(Math.random() * sides) + 1;
  await say(`🎲 <@${command.user_id}> rolled a d${sides} and got a **${roll}**!`);
});

// 3. Rock Paper Scissors
app.command('/hackaway-rps', async ({ command, ack, say }) => {
  await ack();
  const userChoice = getArgs(command.text).toLowerCase();
  const choices = ['rock', 'paper', 'scissors'];
  if (!choices.includes(userChoice)) {
    await say('Please specify `rock`, `paper`, or `scissors`. Example: `/hackaway-rps rock`');
    return;
  }
  const botChoice = choices[Math.floor(Math.random() * 3)];
  let result = "It's a tie! 👔";
  if (
    (userChoice === 'rock' && botChoice === 'scissors') ||
    (userChoice === 'paper' && botChoice === 'rock') ||
    (userChoice === 'scissors' && botChoice === 'paper')
  ) {
    result = 'You win! 🎉';
  } else if (userChoice !== botChoice) {
    result = 'Hackaway wins! 🤖';
  }
  await say(`<@${command.user_id}> chose *${userChoice}*. I chose *${botChoice}*.\n**${result}**`);
});

// 4. Magic 8-Ball
app.command('/hackaway-8ball', async ({ command, ack, say }) => {
  await ack();
  const answers = [
    'It is certain 🟢', 'Without a doubt 🟢', 'Signs point to yes 🟢',
    'Reply hazy, try again 🟡', 'Ask again later 🟡', 'Better not tell you now 🟡',
    'Don\'t count on it 🔴', 'My sources say no 🔴', 'Very doubtful 🔴'
  ];
  const response = answers[Math.floor(Math.random() * answers.length)];
  await say(`🔮 *Question:* ${command.text || 'Is this bot awesome?'}\n*Answer:* ${response}`);
});

// 5. Hacker Name Generator
app.command('/hackaway-hackname', async ({ command, ack, say }) => {
  await ack();
  const prefixes = ['Neo', 'Cyber', 'Null', 'Quantum', 'Glitch', 'Proxy', 'Crypto', 'Byte'];
  const suffixes = ['Striker', 'Ghost', 'Phantom', 'Viper', 'Daemon', 'Matrix', 'Rogue', 'Echo'];
  const p = prefixes[Math.floor(Math.random() * prefixes.length)];
  const s = suffixes[Math.floor(Math.random() * suffixes.length)];
  const inputName = getArgs(command.text) || command.user_name;
  await say(`🕶️ Generated alias for *${inputName}*:\n> **${p}_${s}**`);
});

// ==========================================
// 🛠️ CATEGORY 2: UTILITIES & PRODUCTIVITY
// ==========================================

// 6. Basic Calculator
app.command('/hackaway-calc', async ({ command, ack, say }) => {
  await ack();
  const expression = getArgs(command.text);
  if (!expression || /[^0-9+\-*/().\s]/.test(expression)) {
    await say('Please provide a valid basic math equation (numbers and +, -, *, / only).');
    return;
  }
  try {
    const result = Function(`"use strict"; return (${expression})`)();
    await say(`🧮 \`${expression}\` = **${result}**`);
  } catch {
    await say('Failed to calculate. Check your math syntax!');
  }
});

// 7. Timer
app.command('/hackaway-timer', async ({ command, ack, say }) => {
  await ack();
  const mins = parseFloat(getArgs(command.text)) || 1;
  await say(`⏰ Timer set for **${mins} minute(s)**. I will alert you here!`);
  setTimeout(async () => {
    await say(`🚨 *BEEP BEEP!* <@${command.user_id}>, your ${mins} minute timer is up!`);
  }, mins * 60 * 1000);
});

// 8. Poll Generator
app.command('/hackaway-poll', async ({ command, ack, say }) => {
  await ack();
  const parts = command.text.split('|').map(p => p.trim());
  if (parts.length < 3) {
    await say('Format: `/hackaway-poll Question | Option A | Option B`');
    return;
  }
  await say(`📊 *POLL:* ${parts[0]}\n1️⃣ ${parts[1]}\n2️⃣ ${parts[2]}\n_(React below to cast your vote!)_`);
});

// 9. Base64 Encoder/Decoder
app.command('/hackaway-base64', async ({ command, ack, say }) => {
  await ack();
  const parts = getArgs(command.text).split(' ');
  const mode = parts[0];
  const payload = parts.slice(1).join(' ');
  if (mode === 'encode') {
    const encoded = Buffer.from(payload).toString('base64');
    await say(`🔒 *Encoded:* \`${encoded}\``);
  } else if (mode === 'decode') {
    try {
      const decoded = Buffer.from(payload, 'base64').toString('utf-8');
      await say(`🔓 *Decoded:* \`${decoded}\``);
    } catch {
      await say('Invalid Base64 string.');
    }
  } else {
    await say('Format: `/hackaway-base64 encode <text>` or `/hackaway-base64 decode <text>`');
  }
});

// 10. Random Password Generator
app.command('/hackaway-password', async ({ command, ack, say }) => {
  await ack();
  const len = parseInt(getArgs(command.text)) || 12;
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  let pass = '';
  for (let i = 0; i < len; i++) pass += chars[Math.floor(Math.random() * chars.length)];
  await say(`🔑 Generated secure key: ||\`${pass}\`|| *(Click text block to reveal)*`);
});

// ==========================================
// 💡 CATEGORY 3: MOTIVATION & CODING INSPIRATION
// ==========================================

// 11. Ship Hype
app.command('/hackaway-ship', async ({ command, ack, say }) => {
  await ack();
  await say(`💥🚀🚀 **SHIP ALERTTT!** 🚀🚀💥\nLet's go <@${command.user_id}>! Another project deployed to the cosmos! Keep up the hyper-growth! 🌟🌟`);
});

// 12. Coding Quote
app.command('/hackaway-quote', async ({ command, ack, say }) => {
  await ack();
  const quotes = [
    '"Simplicity is the soul of efficiency." — Austin Freeman',
    '"Make it work, make it right, make it fast." — Kent Beck',
    '"Talk is cheap. Show me the code." — Linus Torvalds',
    '"Programs must be written for people to read, and only incidentally for machines to execute." — Abelson & Sussman'
  ];
  await say(`💬 ${quotes[Math.floor(Math.random() * quotes.length)]}`);
});

// 13. Programmer Joke
app.command('/hackaway-joke', async ({ command, ack, say }) => {
  await ack();
  const jokes = [
    "Why do programmers prefer dark mode? Because light attracts bugs! 🪳",
    "How many programmers does it take to change a lightbulb? None, that's a hardware problem. 💡",
    "There are 10 types of people: those who understand binary, and those who don't. 🔢"
  ];
  await say(`🃏 ${jokes[Math.floor(Math.random() * jokes.length)]}`);
});

// 14. Debugging Advice
app.command('/hackaway-debug', async ({ command, ack, say }) => {
  await ack();
  const tips = [
    "Stand up, stretch, and go drink a glass of water. 💧",
    "Explain your broken code line-by-line to a rubber duck. 🦆",
    "Delete your `node_modules` folder and run `npm install` again. 🗑️",
    "Check your console logs. Did you actually read the error stack trace? 📋"
  ];
  await say(`🛠️ *Hackaway Debug Helper:* ${tips[Math.floor(Math.random() * tips.length)]}`);
});

// 15. Help Command
app.command('/hackaway-help', async ({ command, ack, say }) => {
  await ack();
  const manual = `🤖 **Hackaway Bot Manual**\n\n` +
    `*Games:* \`/hackaway-coinflip\`, \`/hackaway-dice [sides]\`, \`/hackaway-rps [choice]\`, \`/hackaway-8ball [q]\`, \`/hackaway-hackname [name]\`\n` +
    `*Utilities:* \`/hackaway-calc [math]\`, \`/hackaway-timer [mins]\`, \`/hackaway-poll Q | A | B\`, \`/hackaway-base64 [mode] [txt]\`, \`/hackaway-password [len]\`\n` +
    `*Inspiration:* \`/hackaway-ship\`, \`/hackaway-quote\`, \`/hackaway-joke\`, \`/hackaway-debug\``;
  await say(manual);
});

(async () => {
  await receiver.start(process.env.PORT || 3000);
  console.log('⚡️ Hackaway is running via ExpressReceiver with all 15 commands active!');
})();
