module.exports = {
    liveUrl: (id) => `rtmp://127.0.0.1:1935/hls/${id}`,
    playerUrl: (id) => `/hls/${id}.m3u8`,
}