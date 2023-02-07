import http from "http";
import { Server } from "socket.io"; // npm i socket.io

const handleListen = () => console.log(`Listening on http://localhost:8000`);

const httpServer = http.createServer(); 
const wsServer = new Server(httpServer);
wsServer.on("connection", (socket) => {

    socket.on("join_room", (roomName) => { //answer단계에서는 done 생략
        socket.join(roomName);
        socket.to(roomName).emit("welcome");
    });

    //send단계
    socket.on("offer", (offer, roomName) => {
        socket.to(roomName).emit("offer", offer);
    });
    //answer단계
    socket.on("answer", (answer, roomName) => {
        socket.to(roomName).emit("answer", answer);
    });

    //ice candidate WebRTC에서 필요한 프로토콜 연결단계
    socket.on("ice", (ice, roomName) => {
        socket.to(roomName).emit("ice", ice);
      });
});

httpServer.listen(8000,handleListen);
