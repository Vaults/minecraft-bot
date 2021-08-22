import { Vec3 } from 'vec3'; 
import {Bot} from 'mineflayer';

import { BotModule, ErrorHandler } from './bot-module';
import { Logger } from './logger';


type TreeType = {
	name: string;
	avgYield: number;
}

export class TreeBotModule implements BotModule {

	private readonly upVector: any = new Vec3(0, 1,  0);
	private readonly treeNotifyAmount = 50;
	private readonly plantWaitTime = 500;
	
	private treeTypes: TreeType[] = [
		{'name': 'birch', 'avgYield': 4},
		{'name': 'oak', 'avgYield': 4},
		{'name': 'spruce', 'avgYield': 6}
	]

	private errorCount = 0;
	private treeCount = 0;
	private selectedType;
	private errorHandler: ErrorHandler;
	private interval: NodeJS.Timer;

	constructor(private bot: Bot, private dirtBlockPos: any){ }

	setErrorHandler(e: ErrorHandler){
		this.errorHandler = this.errorHandler;
	}	
	start() {
		this.interval = setInterval(this.placeTree, this.plantWaitTime);
	}
	stop() {
		clearInterval(this.interval);
	}

	init(args: string, callback: () => void) {
		this.selectedType = this.treeTypes.find(o => o.name === args);
		const sapling = this.bot.inventory.items().find(o => o.name === `${this.selectedType.name}_sapling`);
		this.bot.equip(sapling, "hand", e => {
			Logger.log(`Equipping ${this.selectedType.name}..`);
			if(e) {
				throw `Player has no ${this.selectedType.name}.`;
			}
			callback();
		})
		
	}

	getIdentifier(){
		return "TreeBot";
	}
	getArgsDescription(){
		return "<tree_type>";
	}


	placeTree = () => {
		
		const dirtBlock = this.bot.blockAt(this.dirtBlockPos);

		this.bot.placeBlock(dirtBlock, this.upVector, () => {
			if(this.bot.blockAt(this.dirtBlockPos.clone().add(this.upVector)).name != '<sapling>') {
				++this.errorCount;
				if(this.errorCount > 2){
					Logger.log("Block not placing, still: " + this.bot.blockAt(this.dirtBlockPos.clone().add(this.upVector)).name);
				}
				if(this.errorCount > 50){
					stop();
				}
			} else {
				this.errorCount = 0;
				if(this.treeCount % this.treeNotifyAmount == 0){
					Logger.log(`Estimated ${this.selectedType.name} yield: ${this.selectedType.avgYield * this.treeCount}`);
				}
				this.treeCount++;
			}
		});
	}
}