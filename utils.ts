import { Vec3 } from 'vec3'; 
const formatPos = (v: any) => [v.x, v.y, v.z].join(",");
const exit = (bot) => {
	bot.chat("Exiting gracefully..");
	setTimeout(() => {
		bot.end();
		process.exit();
	}, 5000);
}

export {exit, formatPos};