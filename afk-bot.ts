import { Input } from './input';
import { SocketHandler } from './socket-handler';
import { Logger } from './logger';


const mineflayer = require("mineflayer");
const bot = mineflayer.createBot({
  host: process.env.MC_HOST,
  port: (process.env.MC_PORT || 25565),
  username: process.env.MC_USER,
  password: process.env.MC_PASS,
  version: null
});

bot.on('chat', (uname, mess)  => {
	Logger.log(`${uname} : ${mess}`);
	if(mess.toLowerCase() === "bot?") {
		bot.chat(`Ik ben aan het botten. Proof: ${Buffer.from(uname + Date.now()).toString('base64')}`);
	}
});
bot.on('playerJoined', (player) => {
	Logger.log(`${player.username} joined`);
});
bot.on('playerLeft', (player) => {
    Logger.log(`${player.username} left`);
});

const inputHandler = new Input(bot);
new SocketHandler(inputHandler);

