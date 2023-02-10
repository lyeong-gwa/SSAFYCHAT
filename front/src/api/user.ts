import { localServer } from "./http";

const api = localServer();

async function login(user:any, success:any, fail:any) {
    await api.post('/login', JSON.stringify(user)).then(success).catch(fail);
}

async function logout(user: string, success:any, fail:any) {
    api.defaults.headers["Authorization"] = "Bearer " + sessionStorage.getItem("access-token");
    api.defaults.headers["Access-Control-Allow-Origin"] = '*';
    await api.get('/user/logout').then(success).catch(fail);
}

async function join(user:any, success:any, fail:any) { 
    await api.post('/regist', JSON.stringify(user)).then(success).catch(fail);      
}

async function userinfo(success: any, fail: any) {
    api.defaults.headers["Authorization"] = "Bearer " + sessionStorage.getItem("access-token");
    await api.get('/user/user-info').then(success).catch(fail);
}

export {login, logout, join, userinfo};