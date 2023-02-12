import "../styles/container/mentor-reservation-container.css"
import CardList from "../components/common/CardList";
import ReservedList from "../components/mentoring/ReservedList";
import { dragCard } from "../utils/ts/move";
import { useAppDispatch} from '../hooks/hooks'
import { changeBanner } from "../store/userSlice"
import { useEffect } from "react";
import {getAppointment} from "../api/mentoring"

function MentorReservationContainer(){
    const dispatch = useAppDispatch();
    dispatch(changeBanner("멘토링 확인"));
    const cardList = [["김도원","네이버","백엔드 개발자","2023-01-01"],["김겨울","SMENT","가수","2023-01-01"],["3","SMENT","가수","2023-01-01"],["4","SMENT","가수","2023-01-01"],["5","SMENT","가수","2023-01-01"],["6","SMENT","가수","2023-01-01"]];
    useEffect(()=>{
        console.log("getAppointment");
        getAppointment((success : any)=>{console.log(success)},(fail : any)=>{console.log(fail)});
    })
    return (
        <div className="mentor_reservation_page_container">
            <div className="mentor_reservation_page_inner_container">
                <ReservedList></ReservedList>
                <CardList drag={dragCard} header={"신청 목록"} cardList = {cardList} isAbleDrag={true} container={"reserved_list_container"} isEnterable={true} hoverText={"리스트에 드래그 앤 드롭하여 수락"}></CardList>
            </div>
        </div>
    )
}

export default MentorReservationContainer;