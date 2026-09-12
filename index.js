const { App, ExpressReceiver } = require('@slack/bolt');
require('dotenv').config();

const r = new ExpressReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  endpoints: '/slack/events'
});

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  receiver: r
});

r.router.get('/', (req, res) => {
  res.send('ok');
});

const parseText = (t) => t ? t.trim() : '';

app.command('/hackaway-coinflip', async ({ command, ack, say }) => {
  await ack();
  const res = Math.random() < 0.5 ? 'Heads 🪙' : 'Tails 🪙';
  await say(`<@${command.user_id}> flipped a coin: *${res}*`);
});

app.command('/hackaway-dice', async ({ command, ack, say }) => {
  await ack();
  const s = parseInt(parseText(command.text)) || 6;
  const roll = Math.floor(Math.random() * s) + 1;
  await say(`🎲 <@${command.user_id}> rolled a d${s} and landed on *${roll}*`);
});

app.command('/hackaway-rps', async ({ command, ack, say }) => {
  await ack();
  const user = parseText(command.text).toLowerCase();
  const opts = ['rock', 'paper', 'scissors'];
  if (!opts.includes(user)) {
    await say("type rock, paper, or scissors after the command, like `/hackaway-rps rock`");
    return;
  }
  const bot = opts[Math.floor(Math.random() * 3)];
  let outcome = "draw 🤝";
  if (
    (user === 'rock' && bot === 'scissors') ||
    (user === 'paper' && bot === 'rock') ||
    (user === 'scissors' && bot === 'paper')
  ) {
    outcome = 'you got me, nice win 🎉';
  } else if (user !== bot) {
    outcome = 'haha i take this one 🤖';
  }
  await say(`<@${command.user_id}> threw ${user}, I went with ${bot}.\n> *${outcome}*`);
});

app.command('/hackaway-8ball', async ({ command, ack, say }) => {
  await ack();
  const answers = [
    'for sure', 'yeah absolutely', 'looks solid',
    'hard to tell right now', 'maybe ask later', 'idk tbh',
    'nope', 'doubt it', 'definitely not'
  ];
  const ans = answers[Math.floor(Math.random() * answers.length)];
  const q = command.text || 'is this bot cool?';
  await say(`🔮 *${q}*\n> ${ans}`);
});

app.command('/hackaway-hackname', async ({ command, ack, say }) => {
  await ack();
  const p = ['Neo', 'Cyber', 'Null', 'Quantum', 'Glitch', 'Proxy', 'Crypto', 'Byte'][Math.floor(Math.random() * 8)];
  const s = ['Striker', 'Ghost', 'Phantom', 'Viper', 'Daemon', 'Matrix', 'Rogue', 'Echo'][Math.floor(Math.random() * 8)];
  const n = parseText(command.text) || command.user_name;
  await say(`🕶️ generated alias for ${n}:\n>\`${p}_${s}\``);
});

app.command('/hackaway-calc', async ({ command, ack, say }) => {
  await ack();
  const exp = parseText(command.text);
  if (!exp || /[^0-9+\-*/().\s]/.test(exp)) {
    await say('keep it simple with numbers and basic math symbols (+, -, *, /)');
    return;
  }
  try {
    const val = Function(`"use strict"; return (${exp})`)();
    await say(`🧮 \`${exp}\` = *${val}*`);
  } catch {
    await say('hit a snag computing that, check your syntax');
  }
});

app.command('/hackaway-timer', async ({ command, ack, say }) => {
  await ack();
  const mins = parseFloat(parseText(command.text)) || 1;
  await say(`⏰ gotcha, timer set for ${mins} minute(s). I'll ping you.`);
  setTimeout(async () => {
    await say(`🚨 heads up <@${command.user_id}>, your ${mins}m timer just went off!`);
  }, mins * 60 * 1000);
});

app.command('/hackaway-poll', async ({ command, ack, say }) => {
  await ack();
  const parts = command.text.split('|').map(x => x.trim());
  if (parts.length < 3) {
    await say('format needs to be: `/hackaway-poll Question | Option A | Option B`');
    return;
  }
  await say(`📊 *${parts[0]}*\n1️⃣ ${parts[1]}\n2️⃣ ${parts[2]}\n_drop a reaction to vote_`);
});

app.command('/hackaway-base64', async ({ command, ack, say }) => {
  await ack();
  const parts = parseText(command.text).split(' ');
  const mode = parts[0];
  const payload = parts.slice(1).join(' ');
  if (mode === 'encode') {
    await say(`🔒 \`${Buffer.from(payload).toString('base64')}\``);
  } else if (mode === 'decode') {
    try {
      await say(`🔓 \`${Buffer.from(payload, 'base64').toString('utf-8')}\``);
    } catch {
      await say('that base64 string looks broken');
    }
  } else {
    await say('try: `/hackaway-base64 encode <text>` or `/hackaway-base64 decode <text>`');
  }
});

app.command('/hackaway-password', async ({ command, ack, say }) => {
  await ack();
  const len = parseInt(parseText(command.text)) || 12;
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  let pass = '';
  for (let i = 0; i < len; i++) pass += chars[Math.floor(Math.random() * chars.length)];
  await say(`🔑 here is your key: ||\`${pass}\`|| *(click to reveal)*`);
});

app.command('/hackaway-ship', async ({ command, ack, say }) => {
  await ack();
  await say(`🚀 let's go <@${command.user_id}>! another ship landed! 💥🔥`);
});

app.command('/hackaway-quote', async ({ command, ack, say }) => {
  await ack();
  const quotes = [
    '"Simplicity is the soul of efficiency." — Austin Freeman',
    '"Make it work, make it right, make it fast." — Kent Beck',
    '"Talk is cheap. Show me the code." — Linus Torvalds',
    '"Programs must be written for people to read..." — Abelson & Sussman'
  ];
  await say(`> ${quotes[Math.floor(Math.random() * quotes.length)]}`);
});

app.command('/hackaway-joke', async ({ command, ack, say }) => {
  await ack();
  const jokes = [
    "why do programmers prefer dark mode? because light attracts bugs 🪳",
    "how many programmers does it take to change a lightbulb? none, that's a hardware issue 💡",
    "there are 10 types of people: those who get binary, and those who don't 🔢"
  ];
  await say(jokes[Math.floor(Math.random() * jokes.length)]);
});

app.command('/hackaway-debug', async ({ command, ack, say }) => {
  await ack();
  const tips = [
    "step away for a second, get some water 💧",
    "try talking through your code out loud to a rubber duck 🦆",
    "delete `node_modules`, clear cache, and run `npm install` again 🗑️",
    "actually read the error stack trace instead of skimming it 📋"
  ];
  await say(`💡 *quick tip:* ${tips[Math.floor(Math.random() * tips.length)]}`);
});

app.command('/hackaway-help', async ({ command, ack, say }) => {
  await ack();
  await say(
    `Here's everything you can run:\n\n` +
    `*Games:* \`/hackaway-coinflip\`, \`/hackaway-dice\`, \`/hackaway-rps\`, \`/hackaway-8ball\`, \`/hackaway-hackname\`\n` +
    `*Tools:* \`/hackaway-calc\`, \`/hackaway-timer\`, \`/hackaway-poll\`, \`/hackaway-base64\`, \`/hackaway-password\`\n` +
    `*Vibes:* \`/hackaway-ship\`, \`/hackaway-quote\`, \`/hackaway-joke\`, \`/hackaway-debug\``
  );
});

(async () => {
  await r.start(process.env.PORT || 3000);
  console.log('Bot is online.');
})();
