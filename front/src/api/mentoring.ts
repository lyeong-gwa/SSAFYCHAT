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
    api.defaults.headers["Authorization"] = "Bearer " + sessionStorage.getItem("access-token");
    await api.get(`/mentoring/reservation`)
    .then(success)
    .catch(fail);
}
// 신청한 멘토링 취소
async function cancelReservation(info:{applyMentoringId: number},success: any, fail : any){

        api.defaults.headers["Authorization"] = "Bearer " + sessionStorage.getItem("access-token");
        await api.delete(`/mentoring/cancel/reservation`,{data:JSON.stringify(info)})
        .then(success)
        .catch(fail);
}
// 예약된 멘토링 취소
async function cancelMenteeMentoring(info:{mentoringId:number,reason:string},
    success:any,fail:any) {

        api.defaults.headers["Authorization"] = "Bearer " + sessionStorage.getItem("access-token");
        await api.delete(`/mentoring/cancel/matched-reservation`,{data:JSON.stringify(info)})
        .then(success)
        .catch(fail);

}

// 확정된 멘토링리스트와 요청멘토링리트를 받아온다.
async function getAppointmentApi(success : any, fail : any){
    api.defaults.headers["Authorization"] = "Bearer " + sessionStorage.getItem("access-token");
    await api.get(`/mentoring/appointment`)
    .then(success)
    .catch(fail);
}
// 요청멘토링 중 하나를 승낙한다
async function setAppointmentApi(appointment:{applyMentoringId:number, time:string}, success: any, fail: any){
    api.defaults.headers["Authorization"] = "Bearer " + sessionStorage.getItem("access-token");
    await api.post(`/mentoring/appointment`,JSON.stringify({applyMentoringId:appointment.applyMentoringId, time:appointment.time}))
    .then(success)
    .catch(fail);
}
// 매칭된 멘토링 취소
async function cancelAppointmentApi(info:{mentoringId:number,reason:string},
    success:any,fail:any) {
        api.defaults.headers["Authorization"] = "Bearer " + sessionStorage.getItem("access-token");
        await api.delete(`/mentoring/cancel/appointment`,{data:JSON.stringify(info)})
        .then(success)
        .catch(fail);
}


// 멘토링 종료
async function completeMentoring(id:{mentoringId:number},
    success:any,
    fail: any){
        api.defaults.headers["Authorization"] = "Bearer " + sessionStorage.getItem("access-token");
        await api.delete(`/mentoring/complete`,{data:JSON.stringify(id)})
        .then(success)
        .catch(fail);
    
}

export {reservation,getAppointmentApi,setAppointmentApi,cancelReservation,cancelMenteeMentoring, cancelAppointmentApi, completeMentoring};