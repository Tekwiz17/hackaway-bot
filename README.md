# Hackaway Bot 🚀

This is a Slack bot I made for Hackaway.

I wanted it to have some actually useful commands, but also a bunch of random stuff that makes Slack more fun. So there are games, little tools, jokes, and some completely unnecessary commands that are still pretty fun.

It runs with Node.js and Slack Bolt. There isn't a database or anything complicated, which makes it pretty easy to run and change.

## What can it do?

### 🎮 Games

- `/hackaway-coinflip` - flips a coin
- `/hackaway-dice` - rolls a die
- `/hackaway-rps` - play rock paper scissors against the bot
- `/hackaway-8ball` - ask the magic 8-ball a question
- `/hackaway-hackname` - makes a random hacker name

### 🛠️ Useful stuff

- `/hackaway-calc` - does basic math
- `/hackaway-timer` - starts a timer and pings you when it's done
- `/hackaway-poll` - makes a really simple poll
- `/hackaway-base64` - encode/decode Base64
- `/hackaway-password` - makes a random password

### 🤪 Random stuff

- `/hackaway-ship` - celebrates when another ship lands
- `/hackaway-quote` - gives you a random tech/programming quote
- `/hackaway-joke` - tells a programming joke
- `/hackaway-debug` - gives you a random debugging tip

You can also use `/hackaway-help` to see all of the commands from inside Slack.

## What you need

You'll need:

- Node.js
- A Slack workspace where you can install an app
- A Slack app with a bot token and signing secret

The bot uses **Slack Bolt 4.1.1** and **dotenv 16.4.5**.

## Running it

### 1. Clone it

```bash
git clone https://github.com/Tekwiz17/hackaway-bot.git
cd hackaway-bot
```

### 2. Install everything

```bash
npm install
```

### 3. Set up the Slack app

Make a Slack app from the Slack API dashboard and install it into your workspace.

The bot listens on:

```text
/slack/events
```

You also need to add the slash commands listed below to your Slack app.

For the request URL, use the public URL of wherever you're running the bot, followed by `/slack/events`.

Example:

```text
https://your-domain.example/slack/events
```

### 4. Make a `.env` file

Create a file called `.env` in the project folder:

```env
SLACK_BOT_TOKEN=xoxb-your-bot-token
SLACK_SIGNING_SECRET=your-signing-secret
PORT=3000
```

You don't have to add `PORT` because the bot uses `3000` by default.

Also, seriously, don't put your `.env` file on GitHub. Your bot token and signing secret should stay private.

### 5. Start it

```bash
npm start
```

You should see:

```text
Bot is online.
```

And that's it.

## Commands

All of the commands start with `/hackaway-`.

| Command | What it does | Example |
| --- | --- | --- |
| `/hackaway-help` | Shows all the commands | `/hackaway-help` |
| `/hackaway-coinflip` | Flips a coin | `/hackaway-coinflip` |
| `/hackaway-dice` | Rolls a die | `/hackaway-dice 20` |
| `/hackaway-rps` | Rock paper scissors | `/hackaway-rps rock` |
| `/hackaway-8ball` | Answers a question | `/hackaway-8ball will we win?` |
| `/hackaway-hackname` | Makes a hacker name | `/hackaway-hackname Austin` |
| `/hackaway-calc` | Does basic math | `/hackaway-calc 12 * 4` |
| `/hackaway-timer` | Starts a timer | `/hackaway-timer 5` |
| `/hackaway-poll` | Makes a poll | `/hackaway-poll Pizza tonight? \| Yes \| No` |
| `/hackaway-base64` | Encodes/decodes Base64 | `/hackaway-base64 encode hello` |
| `/hackaway-password` | Makes a random password | `/hackaway-password 16` |
| `/hackaway-ship` | Sends a ship celebration | `/hackaway-ship` |
| `/hackaway-quote` | Random tech quote | `/hackaway-quote` |
| `/hackaway-joke` | Random programming joke | `/hackaway-joke` |
| `/hackaway-debug` | Random debugging tip | `/hackaway-debug` |

### Dice

Just run the command for a normal d6. You can also put a number after it for a different number of sides.

```text
/hackaway-dice
/hackaway-dice 20
```

### Rock Paper Scissors

Type `rock`, `paper`, or `scissors`.

```text
/hackaway-rps paper
```

Then the bot picks one too and tells you who won.

### 8-ball

Ask a question after the command.

```text
/hackaway-8ball should I submit?
```

No question? That's fine too. It has a default one.

### Hack Name

Give it a name, or leave it blank and it uses your Slack username.

```text
/hackaway-hackname Austin
```

You might get something like `Cyber_Ghost` or `Quantum_Rogue`.

### Calculator

It handles basic math with numbers, parentheses, and `+`, `-`, `*`, and `/`.

```text
/hackaway-calc (25 + 5) / 3
```

### Timer

The timer uses minutes. If you don't put a number, it uses 1 minute.

```text
/hackaway-timer 10
```

When it finishes, the bot pings the person who started it.

### Poll

Put the question and answers between `|` characters.

```text
/hackaway-poll Best snack? | Chips | Candy
```

Right now it supports a question and at least two choices. People can vote with reactions.

### Base64

Use `encode` or `decode` and then the text.

```text
/hackaway-base64 encode hello world
/hackaway-base64 decode aGVsbG8=
```

### Password generator

You can choose the length, or leave it blank for the default 12-character password.

```text
/hackaway-password
/hackaway-password 20
```

The password is hidden in Slack until you click it.

## Making your own commands

Most of the bot is in `index.js`, so adding stuff is pretty straightforward.

A basic command looks like this:

```js
app.command('/hackaway-example', async ({ command, ack, say }) => {
  await ack();
  await say('Hello there!');
});
```

Then you add the matching slash command in your Slack app.

That's basically how I built the rest of the commands too.

Some stuff you could add:

- Hackathon countdowns
- Team randomizers
- Tech trivia
- More games
- Random challenge generators
- More stupid/funny commands

## Project files

```text
hackaway-bot/
├── index.js       # All the bot commands
├── package.json   # Dependencies and start script
└── README.md      # You are reading this
```

## Hosting

The bot has to be running on a Node.js server and Slack needs to be able to reach it over the internet.

For testing, you can run it on your computer and use a tunneling service to give Slack a public URL. For a real deployment, use a Node.js-friendly host or your own server.

## A couple things to know

The calculator is intentionally pretty limited. It only allows numbers, spaces, parentheses, and basic math symbols.

Also, this bot doesn't use a database right now. Everything is just in the app itself, which is part of why it's pretty easy to mess around with.

## Contributing

Found a bug or have a cool command idea? Open an issue or make a pull request.

I'm especially interested in commands that would actually be fun in a Hackaway Slack workspace.

## License

There isn't a license on this repo right now.

---

Made for Hackaway because Slack doesn't have enough random buttons already. 😎
