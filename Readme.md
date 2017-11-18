# Live App

Use Nginx(nginx-rtmp-module) + nodejs + videojs

Nginx need build with nginx-rtmp-module(https://github.com/arut/nginx-rtmp-module);

### Build
```
cd ./website
npm i 
```

### Start
```
chmod -R 777 ./start_nginx.sh
./start_nginx.sh
```

### Use

Open https://localhost:8081/play/ to recoder
Open https://localhost:8081/play/player.html to play