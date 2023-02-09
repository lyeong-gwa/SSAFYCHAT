import { localServer } from "./http";

const api = localServer();
// type Result = ResultSuccess | ResultFailure;
// interface ResultSuccess {
//     success: true,
//     response: Interface1
// }
// interface ResultFailure{
//     success: failure,
//     error: Interface2
// }

// param, success, fail 을 받아 함수 호출
async function reservation(success : any, fail : any){
    api.defaults.headers["Authorization"] = "Bearer " + sessionStorage.getItem("refresh-token");
    await api.get(`/mentoring/reservation`)
    .then(success)
    .catch(fail);
}

export {reservation,};