# Hackaway Bot

A small Slack bot built for Hackaway events — part useful tools, part games, and part things that are just fun to have in a Slack workspace.

It is intentionally simple: one Node.js app, Slack Bolt, and environment variables. There is no database or complicated setup to get in the way.

## Features

### 🎮 Games
- **Coin flip** — heads or tails
- **Dice rolls** — roll any-sided dice
- **Rock Paper Scissors** — play against the bot
- **8-ball** — ask a question and get a random answer
- **Hack name generator** — generate a goofy hacker-style alias

### 🛠️ Handy tools
- **Calculator** — basic arithmetic from Slack
- **Timer** — set a timer and get pinged when it finishes
- **Polls** — make a simple reaction-based poll
- **Base64** — encode or decode text
- **Password generator** — generate a random password

### ✨ Just-for-fun commands
- **Ship** — celebrate another ship landing
- **Quotes** — random programming/tech quote
- **Jokes** — random programming joke
- **Debug tips** — get a random debugging suggestion

There is also a built-in help command that lists the available commands.

## Requirements

You will need:

- Node.js
- A Slack workspace where you can install apps
- A Slack app with a bot token and signing secret

The project uses **@slack/bolt 4.1.1** and **dotenv 16.4.5**.

## Run it yourself

### 1. Clone the repository

```bash
git clone https://github.com/Tekwiz17/hackaway-bot.git
cd hackaway-bot
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a Slack app

Create a new app from the Slack API dashboard and install it into your workspace.

This project uses Slack Bolt's `ExpressReceiver` and receives requests through `/slack/events`.

Add each slash command from the command table below to your Slack app. Set the request URL to the public URL where your bot is running.

For example:

```text
https://your-domain.example/slack/events
```

### 4. Create your `.env` file

In the project folder, create a file named `.env`:

```env
SLACK_BOT_TOKEN=xoxb-your-bot-token
SLACK_SIGNING_SECRET=your-signing-secret
PORT=3000
```

`PORT` is optional. The application uses port `3000` when it is not set.

**Keep this file private.** Never commit your bot token or signing secret to GitHub.

### 5. Start the bot

```bash
npm start
```

When the server starts successfully, it prints:

```text
Bot is online.
```

## Commands

Every command uses the `/hackaway-` prefix.

| Command | Description | Example |
| --- | --- | --- |
| `/hackaway-help` | Shows all available commands | `/hackaway-help` |
| `/hackaway-coinflip` | Flips a coin | `/hackaway-coinflip` |
| `/hackaway-dice` | Rolls a die | `/hackaway-dice 20` |
| `/hackaway-rps` | Plays Rock Paper Scissors | `/hackaway-rps rock` |
| `/hackaway-8ball` | Answers a question | `/hackaway-8ball will we win?` |
| `/hackaway-hackname` | Generates a hacker-style alias | `/hackaway-hackname Austin` |
| `/hackaway-calc` | Calculates basic arithmetic | `/hackaway-calc 12 * 4` |
| `/hackaway-timer` | Starts a timer in minutes | `/hackaway-timer 5` |
| `/hackaway-poll` | Creates a simple reaction poll | `/hackaway-poll Pizza tonight? \| Yes \| No` |
| `/hackaway-base64` | Encodes or decodes Base64 | `/hackaway-base64 encode hello` |
| `/hackaway-password` | Generates a random password | `/hackaway-password 16` |
| `/hackaway-ship` | Sends a ship celebration | `/hackaway-ship` |
| `/hackaway-quote` | Sends a random tech quote | `/hackaway-quote` |
| `/hackaway-joke` | Sends a programming joke | `/hackaway-joke` |
| `/hackaway-debug` | Sends a debugging tip | `/hackaway-debug` |

### Dice

Without an argument, the bot rolls a d6. Pass a number to choose the number of sides.

```text
/hackaway-dice
/hackaway-dice 20
```

### Rock Paper Scissors

Use `rock`, `paper`, or `scissors`.

```text
/hackaway-rps paper
```

### 8-ball

Put your question after the command. Leaving it blank uses a default question.

```text
/hackaway-8ball should I submit?
```

### Hack name

Add a name or nickname. Leave it blank and the bot uses your Slack username.

```text
/hackaway-hackname Austin
```

### Calculator

The calculator accepts numbers, parentheses, spaces, and basic arithmetic operators such as `+`, `-`, `*`, and `/`.

```text
/hackaway-calc (25 + 5) / 3
```

### Timer

The timer is measured in minutes. With no argument, it defaults to 1 minute. When it finishes, the bot pings the person who started it.

```text
/hackaway-timer 10
```

### Poll

Separate the question and choices with `|` characters.

```text
/hackaway-poll Best snack? | Chips | Candy
```

The current implementation requires a question and at least two choices, then asks people to vote with reactions.

### Base64

Use either `encode` or `decode` followed by the data.

```text
/hackaway-base64 encode hello world
/hackaway-base64 decode aGVsbG8=
```

### Password generator

Give the desired length or leave it blank for the default 12-character password. The generated value is hidden in Slack until clicked.

```text
/hackaway-password
/hackaway-password 20
```

## Make your own

Most of the bot lives in `index.js`, which keeps the project easy to understand and customize.

To add a new command, use the same basic pattern:

```js
app.command('/hackaway-example', async ({ command, ack, say }) => {
  await ack();
  await say('Hello there!');
});
```

Then create the matching slash command in your Slack app.

### Easy things to customize

You can change the random responses, rename commands, modify messages, or add completely new commands without changing the overall structure.

Some ideas for a hackathon workspace:

- Team randomizers
- Hackathon countdowns
- Tech trivia
- Random challenge prompts
- Standup helpers
- Project name generators

Because the current bot does not use a database, simple additions can stay lightweight.

## Project structure

```text
hackaway-bot/
├── index.js       # Bot logic and slash commands
├── package.json   # Dependencies and npm start script
└── README.md      # Documentation
```

## Hosting

The bot needs to run as a Node.js process and be reachable by Slack over the internet.

For development, you can use a tunneling service to expose your local server to Slack. For a permanent deployment, use a Node-compatible host or your own server.

## A note about the calculator

The calculator checks the expression before evaluating it and only allows numbers, whitespace, parentheses, and basic arithmetic symbols. It is meant for simple math, not as a general-purpose programming language.

## Contributing

Found a bug or have a command idea? Open an issue or submit a pull request. Small improvements are welcome, especially commands that fit the Hackaway theme without making the bot unnecessarily complicated.

## License

No license is currently specified for this repository. Add a license if you want to clearly define how others may use, modify, or redistribute the code.

---

Built for Hackaway. Made to be messed with. 🚀
