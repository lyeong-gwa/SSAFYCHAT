import { localServer } from "./http";

const api = localServer();

// 롤링페이퍼에서 불러옴
async function getReview(success : any, fail : any){
    api.defaults.headers["Authorization"] = "Bearer " + sessionStorage.getItem("access-token");
    await api.get(`/mentoring/review`)
    .then(success)
    .catch(fail);
}
// 리뷰 등록
async function setReview(review:{completeMentoringId: number, reviewContent: string, score: number},
    success : any, fail : any){
    api.defaults.headers["Authorization"] = "Bearer " + sessionStorage.getItem("access-token");
    await api.post(`/mentoring/review`, JSON.stringify(review))
    .then(success)
    .catch(fail);
}
// 리뷰위치 변경
async function patchReview(review:{completeMentoringId: number, reviewContent: string, reviewHeight:number, reviewWidth:number,reviewSelected:number},
    success:any, fail:any){
    api.defaults.headers["Authorization"] = "Bearer " + sessionStorage.getItem("access-token");
    await api.patch(`/mentoring/review`, JSON.stringify(review))
    .then(success)
    .catch(fail);
    }


export {getReview,setReview,patchReview};