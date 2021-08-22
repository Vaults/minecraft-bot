import { Input } from './input';
import { SocketHandler } from './socket-handler';
import { Logger } from './logger';
import { Bot, createBot } from 'mineflayer';


const bot: Bot = createBot({
  host: process.env.MC_HOST,
  port: (+process.env.MC_PORT || 25565),
  username: process.env.MC_USER,
  password: process.env.MC_PASS,
  version: process.env.MC_VERSION
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
bot.on('login', () => {
  console.log('Bot connected');

});

const inputHandler = new Input(bot);
new SocketHandler(inputHandler);

