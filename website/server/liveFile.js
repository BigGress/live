let path = require("path");
let ffmpeg = require("fluent-ffmpeg");
let uuidv4 = require("uuid/v4");
let {liveUrl} = require("./config");

let {writeFile, unlink} = require("./util");

function makeUrl(file) {
    return path.resolve(__dirname, `./cache/${file}.mp4`);
}

function liveFile(data, userId) {
    let id = uuidv4();
    let url = makeUrl(id);
    
    writeFile(url, data, "base64")
    .then(() => {
        live(url, userId);
        deleteFile(url);
    });
}

function live(url, id) {
    ffmpeg(url)
    .duration(30)
    .videoCodec("libx264")
    .format("flv")
    .output(liveUrl(id))
    .run();
}

function deleteFile(url) {
    setTimeout(() => {
        unlink(url)
    }, 120000)
}

module.exports = {
    liveFile: liveFile
}