import { localServer } from "./http";

const api = localServer();

// param, success, fail 을 받아 함수 호출
async function getReview(success : any, fail : any){
    api.defaults.headers["Authorization"] = "Bearer " + sessionStorage.getItem("access-token");
    await api.get(`/mentoring/review`)
    .then(success)
    .catch(fail);
}
async function setReview(review:{completeMentoringId: number, reviewContent: string, score: number},
    success : any, fail : any){
    api.defaults.headers["Authorization"] = "Bearer " + sessionStorage.getItem("access-token");
    await api.post(`/mentoring/review`, JSON.stringify(review))
    .then(success)
    .catch(fail);
}



export {getReview,setReview};