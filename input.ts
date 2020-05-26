import * as readline from 'readline';
import { BotModuleManager } from './bot-module-manager';
import { exit } from './utils';

export class Input {
    private moduleManager: BotModuleManager;
    constructor(private bot){
        this.moduleManager = new BotModuleManager(bot);
        readline.createInterface({
            input: process.stdin,
            output: process.stdout
        }).on("line", i => {
            this.processInput(i);
        });
    }

    processInput(inputLine: string) {
        if(!inputLine.startsWith("/")){
            this.bot.chat(inputLine);
        }

        const tokens = inputLine.split(' ');
        if(tokens[0] === "/exit"){
            exit(this.bot);
        }
        if(tokens[0] === "/module"){
            if(tokens[1] === "start"){
                this.moduleManager.startModule(tokens[2], tokens.slice(3).join(" "));
            } else if(tokens[1] === "stop"){
                this.moduleManager.stopModule(tokens[2]);
            }
        }
    }
}