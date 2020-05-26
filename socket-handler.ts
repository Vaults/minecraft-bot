import { Input } from "./input";
import { Logger, LogCallback } from "./logger";

export class SocketHandler {
    private isInitialized = false;

    constructor(private input: Input){
        
      const io = require("socket.io");
      const socketServer = io.listen(1337);

      socketServer.on("connection", (socket) => {
        socket.on("auth", (pass: string) => {
          if(pass === process.env.MC_PASS) {
            this.initSocket(socket);
          } else {
            Logger.log("Failed login attempt! IP: " + socket.handshake.address);
            socket.emit("auth_failed", "Invalid password!" + pass);
          }
        });
      });
    }

    private initSocket(socket): void{
      if(!this.isInitialized) {
        socket.on("input", (message) => {
          Logger.log("==> " + message, false);
          this.input.processInput(message);
        });          
        const lc: LogCallback = message => {
          socket.emit("stdout", message);
        }
        Logger.extendLog(lc);
        
        socket.on('disconnect', () => {
          Logger.removeExtension(lc);
          Logger.log("Socket user disconnected.")
          this.isInitialized = false;
        });

        Logger.log("Socket user connected.");
        this.isInitialized = true;
      }      
    }
}