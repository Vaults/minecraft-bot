export type LogCallback = (s: string) => void;
export abstract class Logger {

    private static logCallbacks: LogCallback[] = [];
    constructor(){}

    private static datePrefix(str: string){
        return `[${new Date(Date.now()).toLocaleString()}] ` + str;
    }

    public static log(s: string, displayTime = true){
        const printString = (displayTime)? this.datePrefix(s) : s;
        
        console.log(printString);
        this.logCallbacks.forEach(lc => lc(printString));
    }

    public static extendLog(lc: LogCallback){
        this.logCallbacks.push(lc);
    }

    public static removeExtension(lc: LogCallback){
        this.logCallbacks = [];
    }
}