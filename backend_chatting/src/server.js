import http from "http";
import express from "express"; //node서버 express사용
import { Server } from "socket.io"; // npm i socket.io
const handleListen = () => console.log(`Listening on http://localhost:8000`);
const {chatting} = require('../mongoose/model');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/chat", async(request, response)=>{
        const chat_id = request.body.chat_id;
        const user_id = request.body.user_id;
        const message = request.body.message;
        
        const obj_message = { "user_id" : user_id, "message": message, "Date" : Date.now()};

        let result = await chatting.findOneAndUpdate({"chat_id": chat_id},{ $push: { content: obj_message } },{new:true});
        if(result == null){
            const create_chat = await chatting.create({"chat_id": chat_id});
            if(create_chat != null){
                result = await chatting.findOneAndUpdate({"chat_id": chat_id},{ $push: { content: obj_message , content_id:{$size: "$content"} } },{new:true});
                if(result == null){
                    response.status(500);
                    response.send("error");
                }
            }
        }
        response.status(400);
        console.log(request.body);
        response.send("success");
});




const httpServer = http.createServer(app); 
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
