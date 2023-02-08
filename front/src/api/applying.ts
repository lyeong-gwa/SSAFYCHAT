import { localServer } from "./http";

const api = localServer();

async function search(mentoring:any, success:any, fail:any) {
    api.defaults.headers["Authorization"] = "Bearer " + sessionStorage.getItem("refresh-token");
    await api.get(`/mentoring/search?job=${mentoring.job}&company=${mentoring.company}`)
    .then(success)
    .catch(fail);
}

async function apply(applying:any) {
    await api.post(`/mentoring/apply`, JSON.stringify(applying))
    .then((data)=>{console.log(data);})
    .catch((err)=>{console.log(err);
    });
}

export {search, apply};