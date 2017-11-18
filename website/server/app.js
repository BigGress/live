var http = require("http");
var express = require("express");
var socket = require("socket.io");
var path = require("path");
let { liveUrl, playerUrl } = require("./config");

let { liveFile } = require("./liveFile");

const app = express();

app.use("/", express.static(path.resolve(__dirname, "../dist")))

const server = http.Server(app);
const io = socket(server);

server.listen(3000, () => {
    console.log(`listening http://localhost:3000`);
});

let players = [];
let ids = [];

io.on("connection", (socket) => {
    let emitList = () => socket.broadcast.emit("list", { ids: players });
    socket.on("start_play", (id) => {
        ids.push({
            id: id,
            playUrl: playerUrl(id),
        });

        console.log(id);

        players.push({
            id: id,
        })

        emitList();
    })

    socket.on("video", (res) => {
        let data = res;
        liveFile(data.data, data.id)
        // let idObj = ids.find(e => e.id == data.id);
    })

    socket.on("get_players", () => {
        // socket.emit("player_list", JSON.stringify({players: players}));
        // emitList();
        socket.emit("list", { ids: players })
    })

    socket.on("play", (userId) => {
        let idObj = ids.find(e => e.id === userId);
        if (idObj) {
            socket.emit("player_url", idObj.playUrl);
        } else {
            socket.emit("player_no_url", false);
        }
    })
})