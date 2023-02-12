import { localServer } from "./http";

const api = localServer();

async function search(mentoring: any, success: any, fail: any) {
  api.defaults.headers["Authorization"] =
    "Bearer " + sessionStorage.getItem("access-token");
  await api
    .get(`/mentoring/search?job=${mentoring.job}&company=${mentoring.company}`)
    .then(success)
    .catch(fail);
}

async function apply(applying: any, success: any, fail: any) {
  api.defaults.headers["Authorization"] =
    "Bearer " + sessionStorage.getItem("access-token");
  console.log(applying.times);
  await api
    .post(`/mentoring/apply`, JSON.stringify(applying))
    .then(success)
    .catch(fail);
}

export { search, apply };
