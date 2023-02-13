import "../styles/container/mentor-reservation-container.css"
import CardList from "../components/common/CardList";
import ReservedList from "../components/mentoring/ReservedList";
import { dragCard } from "../utils/ts/move";
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { changeBanner } from "../store/userSlice"
import { getAppointment } from "../store/mentoringSlice";
import { useEffect } from "react";
import { getAppointmentApi } from "../api/mentoring"

interface applyInfo{
    applyMentoringId: number,
    name: string,
    studentNumber: string,
    numberth: number,
    email: string,
    times: Array<string>,
  }
  
  interface matchInfo{
    name:string,
    studentNumber:string,
    numberth:number,
    email:string,
    time:string,
    mentoringId:number,
}
  
interface AppointmentState{
    applys:Array<applyInfo>,
    matches:Array<matchInfo>,
}

function MentorReservationContainer(){
    const dispatch = useAppDispatch();
    dispatch(changeBanner("멘토링 확인"));

    const apply = useAppSelector(state => state.mentoring.appointmentList.applys);
    const match = useAppSelector(state => state.mentoring.appointmentList.matches);
    const applyData: applyInfo = {
        applyMentoringId: 0,
        name: "",
        studentNumber: "",
        numberth: 0,
        email: "",
        times: [],
    }

    const matcheData: matchInfo = {
        name: "",
        studentNumber: "",
        numberth: 0,
        email: "",
        time: "",
        mentoringId: 0,
    }

    // const cardList = [["김도원","네이버","백엔드 개발자","2023-01-01"],["김겨울","SMENT","가수","2023-01-01"],["3","SMENT","가수","2023-01-01"],["4","SMENT","가수","2023-01-01"],["5","SMENT","가수","2023-01-01"],["6","SMENT","가수","2023-01-01"]];
    const applyList: Array<applyInfo> = [];
    const matchesList: Array<matchInfo> = [];
    useEffect(()=>{
        console.log("getAppointment");
        getAppointmentApi((data: any) => {
            console.log(data);
            const result = data.data.applys;
            const applyItems = result.map((item: applyInfo) => {
                // applyData.applyMentoringId = item.applyMentoringId;
                // applyData.name = item.name;
                // applyData.studentNumber = item.studentNumber;
                // applyData.numberth = item.numberth;
                // applyData.email = item.email;
                // applyData.times = item.times;
                applyList.push(item);
            });
            const matcheItems = result.map((item: matchInfo) => {
                // matcheData.name = item.name;
                // matcheData.studentNumber = item.studentNumber;
                // matcheData.numberth = item.numberth;
                // matcheData.email = item.email;
                // matcheData.time = item.time;
                // matcheData.mentoringId = item.mentoringId;
                matchesList.push(item);
            })

            const rdata: AppointmentState = {
                applys: applyList,
                matches: matchesList,
            }
            dispatch(getAppointment(rdata));
        },
        (error: any) => {
            console.log(error);
        });
    },[])
    const cardList: any[] = [];
    apply.map((item: any) => {
        item.times.map((data: any) => {
            cardList.push([item.name, item.numberth, item.email, data, item.applyMentoringId]);
        });
    });
    // const rcardList: any[] = [];
    // match.map((item: any) => {
    //     rcardList.push([item.data, item.])
    // })
    console.log(cardList);
    return (
        <div className="mentor_reservation_page_container">
            <div className="mentor_reservation_page_inner_container">
                <ReservedList></ReservedList>
                <CardList cardList={cardList} drag={dragCard} header={"신청 목록"} isAbleDrag={true} container={"reserved_list_container"} isEnterable={true} hoverText={"리스트에 드래그 앤 드롭하여 수락"}></CardList>
            </div>
        </div>
    )
}

export default MentorReservationContainer;