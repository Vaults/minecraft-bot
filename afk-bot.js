const mineflayer = require('mineflayer');
const readline = require("readline");
const fs = require("fs");


const bot = mineflayer.createBot({
  host: process.env.MC_HOST,
  port: 25565,
  username: process.env.MC_USER,
  password: process.env.MC_PASS,
  version: false
});

const datePrefix = () => `[${new Date(Date.now()).toLocaleString()}]` ;

bot.on('chat', (uname, mess)  => {
	console.log(`${datePrefix()} ${uname} : ${mess}`);
	if(mess.toLowerCase() === "bot?") {
		bot.chat(`Ik ben aan het botten. Proof: ${Buffer.from('' + Date.now()).toString('base64')}`);
	}
});
bot.on('playerJoined', (player) => {
	console.log(`${datePrefix()} ${player.username} joined`);
});
bot.on('playerLeft', (player) => {
        console.log(`${datePrefix()} ${player.username} left`);
});

bot.on('error', err => console.log(err));

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});
rl.on("line", i => bot.chat(i));
