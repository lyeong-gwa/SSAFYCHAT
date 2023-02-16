import { localServer } from "./mongo";

const api = localServer();

async function chatMessage(chatdata:any, success:any, fail:any) {
    await api.post('/chat', JSON.stringify(chatdata)).then(success).catch(fail);
}
async function chatLog(chatid:Number, success:any, fail:any) {
    await api.get('/chat/'+chatid).then(success).catch(fail);
}

export {chatMessage, chatLog};