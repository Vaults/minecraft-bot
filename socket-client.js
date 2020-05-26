const io = require("socket.io-client");
const readline = require("readline");

var socket = io("http://" +process.env.MC_HOST + ":" + process.env.PORT);

socket.on("stdout", (message) => {
    console.log(message);
});
socket.on("auth_failed", (message) => {
    console.log(message);
});
socket.on("disconnect", () => {
    console.log("Server shut down, exiting.");
    process.exit();
});

socket.emit("auth", process.env.MC_PASS);


readline.createInterface({
    input: process.stdin,
}).on("line", l => {
    socket.emit("input", l);
});