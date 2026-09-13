# hackaway bot

ok so basically i made a slack bot lol

i made it for hackaway because i wanted a bot that had random stuff you could actually use instead of just having one command that says hello

it has a bunch of commands for games, math, timers, random jokes, etc. some of them are useful and some of them are just there because i thought they would be funny

## stuff you can do

`/hackaway-help` - shows the commands

`/hackaway-coinflip` - flips a coin

`/hackaway-dice` - rolls a dice

`/hackaway-rps rock` - play rock paper scissors

`/hackaway-8ball should i do this?` - ask the 8 ball something

`/hackaway-hackname Austin` - gives you a random hacker name

`/hackaway-calc 12 * 4` - does math

`/hackaway-timer 5` - sets a timer for 5 minutes

`/hackaway-poll pizza? | yes | no` - makes a poll

`/hackaway-base64 encode hello` - encodes stuff in base64

`/hackaway-password 16` - makes a random password

`/hackaway-ship` - celebrates another ship landing

`/hackaway-quote` - gives you a random tech quote

`/hackaway-joke` - tells a programming joke

`/hackaway-debug` - gives you a random debugging tip

## how to run it

first you need node.js and a slack workspace where you can install a slack app

clone the repo:

```bash
git clone https://github.com/Tekwiz17/hackaway-bot.git
cd hackaway-bot
```

then install everything:

```bash
npm install
```

you need to make a slack app and get the bot token + signing secret

then make a `.env` file and put this in it:

```env
SLACK_BOT_TOKEN=xoxb-your-bot-token
SLACK_SIGNING_SECRET=your-signing-secret
PORT=3000
```

port is optional because it uses 3000 anyway

also dont upload your `.env` to github unless you want everyone to have your bot token lol

in your slack app, make the slash commands from the list above. the request url needs to end in:

```text
/slack/events
```

so it would look something like:

```text
https://your-site.com/slack/events
```

then run:

```bash
npm start
```

and you should see:

```text
Bot is online.
```

## a few examples

### dice

just running this gives you a d6:

```text
/hackaway-dice
```

you can also pick the number of sides:

```text
/hackaway-dice 20
```

### rock paper scissors

```text
/hackaway-rps rock
```

it picks one too and tells you who won

### 8 ball

```text
/hackaway-8ball should i submit this?
```

### hack name

```text
/hackaway-hackname Austin
```

you get a random name like `Cyber_Ghost` or something like that

### calculator

```text
/hackaway-calc (25 + 5) / 3
```

it does basic math and doesn't let you put random code in there

### timer

```text
/hackaway-timer 10
```

after 10 minutes it pings the person who started it

### poll

```text
/hackaway-poll Best snack? | Chips | Candy
```

people vote with reactions

### base64

```text
/hackaway-base64 encode hello world
```

or

```text
/hackaway-base64 decode aGVsbG8=
```

### password

```text
/hackaway-password
```

default is 12 characters, or you can pick the length:

```text
/hackaway-password 20
```

it hides the password in slack until you click it

## wanna change something?

most of the bot is just in `index.js`, so you can pretty much open that and change stuff

adding a command looks like this:

```js
app.command('/hackaway-example', async ({ command, ack, say }) => {
  await ack();
  await say('hi');
});
```

then make the same slash command in slack

thats basically it

you can add more commands, change the messages, change the random responses, whatever

## files

```text
hackaway-bot/
├── index.js
├── package.json
└── README.md
```

`index.js` is basically the whole bot

`package.json` has the stuff npm needs

and this is the readme obviously

## other stuff

the bot doesn't use a database right now. everything is just in the code

also, if you run this on your own computer, slack needs a way to reach it from the internet, so you need a public url for the slack events endpoint

thats pretty much it

made this for hackaway 🚀
