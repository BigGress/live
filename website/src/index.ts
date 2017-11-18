import * as io from "socket.io-client";
// import * as  from "uuid/v4";
let uuidv4 = require("uuid/v4");
var MediaStreamRecorder = require('msr');

let recordTime = 5000;
let recordEvent = "video";
let recordType = "video/mp4"
let mediaSource: any = {video: true, audio: {echoCancellation: true}};
let video = document.querySelector("#player") as HTMLVideoElement;
let recordBtn = document.querySelector("#record") as HTMLButtonElement;
let stopBtn = document.querySelector("#stop") as HTMLButtonElement;
let socket = io();
let recorderObj: any;
let devicesStream: MediaStream;
let playLists;
let userId: any;

// 获取用户列表
// socket.on("list", (data: any) => {
//     playLists = JSON.parse(data).ids;

//     console.log(playLists);
// })

function getStream(stream: MediaStream) {
    devicesStream = stream;
    video.srcObject = stream;

    recorderObj = new MediaStreamRecorder(stream);

    recorderObj.mimeType = recordType;
    recorderObj.ondataavailable = function (blob: any) {
        socket.emit(recordEvent, {
            id: userId,
            data: blob
        });
    };

    recorderObj.start(recordTime);
}

function recorder() {
    userId = uuidv4();
    socket.emit("start_play", userId);

    navigator.mediaDevices.getUserMedia(mediaSource)
        .then(getStream)
        .catch(console.error);
}

function stopRecorder() {
    recorderObj.stop();
    devicesStream.getTracks().forEach(e => e.stop());
    
    video.srcObject = null;
}


recordBtn.addEventListener("click", recorder, false);
stopBtn.addEventListener("click", stopRecorder, false);
