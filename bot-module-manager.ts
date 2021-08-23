import { BotModule } from "./bot-module";
import { Bot } from "mineflayer";
import { TreeBotModule } from "./tree-bot";
import { Vec3 } from "vec3";
import { Logger } from "./logger";


export class BotModuleManager {
    private activeModules: BotModule[] = [];

    constructor(private bot: Bot){}

    public stopModule (botModuleIden: string) {
        const botModule = this.activeModules.find(o => o.getIdentifier() == botModuleIden);
        botModule.stop();
        Logger.log(`Module ${botModuleIden} stopped.`);
        this.activeModules.splice(this.activeModules.indexOf(botModule), 1);
    }
    public startModule (botModuleIden: string, args: string) {
        const botModule: BotModule = this.instantiateModule(botModuleIden);
        try { 
            botModule.init(args, () => {
                Logger.log(`Module ${botModuleIden} initialized.`)
                botModule.start();
                this.activeModules.push(botModule);
                Logger.log(`Module ${botModuleIden} started!`)
            });
        } catch (e) {
            Logger.log(`Could not start module ${botModuleIden}.`)
            if(botModule) {
                Logger.log(`Syntax for module: /module start TreeBot ${botModule.getArgsDescription()}`)
            }
            Logger.log(e.message);
        }        
    }
    private instantiateModule(botModuleIden) {
        if(botModuleIden == "TreeBot") {
            return new TreeBotModule(this.bot, new Vec3(516, 74, 2359));
        }
    }

}