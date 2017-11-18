import * as io from "socket.io-client";

let socket = io();
let users: any[];
let videojs: any = (<any>window).videojs;
let playerBox = document.querySelector("#player-box") as HTMLElement;
let videoBox = document.querySelector("#video-box") as HTMLElement;

socket.on("list", (data: any) => {
    users = data.ids;

    console.log(users);
    renderUser();
});

socket.on("player_url", (url: string) => {
    console.log(url);
    let html = `
    <video controls preload="auto" autoplay="autoplay" loop="loop" webkit-playsinline>
        <source src="${url}" type="application/x-mpegURL"/>
        <p class="warning">Your browser does not support HTML5 video.</p>
    </video>
    `;

    // let data = videojs("video-box", {
    //     controls: true,
    //     autoplay: false,
    //     preload: 'auto',
    //     techorder: ["flash"],
    //     width: 600,
    //     height: 300,
    //     sources: [{
    //         src: url,
    //         type: "application/x-mpegURL"
    //     }]
    // })

    // data.play();

    videoBox.innerHTML = html;
})

function renderUser() {
    let html = `<ul>`;

    users.forEach(e => {
        html += `<li>${e.id}</li>`;
    })

    html += `</ul>`;

    playerBox.innerHTML += html;

    playerBox.addEventListener("click", (e: MouseEvent) => {
        let el = e.target as HTMLElement;

        if (el.tagName === "LI") {
            socket.emit("play", el.innerText);

            console.log(el.innerText);
        }
    })
}

socket.emit("get_players", true);