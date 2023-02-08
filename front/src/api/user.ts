import { localServer } from "./http";

const api = localServer();

async function login(user:any, success:any, fail:any) {
    await api.post('/login', JSON.stringify(user)).then(success).catch(fail);
}

async function logout(userId: string, success:any, fail:any) {
    await api.delete(`/logout/${userId}`).then(success).catch(fail);
}

export {login, logout};