import { localServer } from "./mongo";

const api = localServer();

async function chatMessage(chatdata:any, success:any, fail:any) {
    console.log(JSON.stringify(chatdata));
    await api.post('/chat', JSON.stringify(chatdata)).then(success).catch(fail);
}


export {chatMessage};