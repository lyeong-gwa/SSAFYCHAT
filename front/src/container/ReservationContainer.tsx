import CardList from "../components/common/CardList";
import ReservedCardList from "../components/mentoring/ReservedCardList";
import "../styles/container/reservation-container.css"
import { dragCard } from "../utils/ts/move";
import { useAppDispatch } from "../hooks/hooks"
import { changeBanner } from "../store/userSlice"
import { reservation } from "../api/mentoring";
import { useEffect } from "react";
import { useAppSelector } from "../hooks/hooks";
import { getReservation } from "../store/mentoringSlice";
import ReservedList from "../components/mentoring/ReservedList";
function ReservationContainer(){
    const dispatch = useAppDispatch();
    dispatch(changeBanner("예약확인"));
    // 예약 리스트들 호출
    useEffect(()=>{
        // console.log("reservation");
        reservation((success : any)=>{
            console.log(success);
            dispatch(getReservation(success.data));
        },(fail : any)=>{console.log(fail)});
    },[])
    const reservationList = useAppSelector(state => state.mentoring.reservationList);

    let app: any = useAppSelector(state => state.mentoring.reservationList.appliedList);
    let can: any = useAppSelector(state => state.mentoring.reservationList.canceledList);
    let mat: any = useAppSelector(state => state.mentoring.reservationList.matchedList);
    let appliedList : any = [];
    let matchedList : any = [];
    let canceledList : any = [];

    // console.log(app);
    // console.log(can);
    app.map((item: any) => {
            appliedList.push(["신청카드",item.company,item.job,item.times[0],item.applyMentoringId]);
    });
    // for(let i = 0; i < app.length; ++i){
    //     appliedList.push(["신청카드",app[i].company,app[i].job,new Date(app[i].times[0]).toISOString(),app[i].applyMentoringId]);
    // }
    // for(let i = 0; i < reservationList.matchedList.length; ++i){
    //     matchedList.push(reservationList.matchedList[i]);
    // }
    // for(let i = 0; i < can.length; ++i){
    //     canceledList.push(["취소카드",can[i].company,can[i].job,new Date(can[i].time).toISOString(),can[i].cancelMentoringId]);
    // }
    can.map((item: any) => {
            canceledList.push(["취소카드",item.company,item.job,item.time,item.cancelMentoringId]);
    });

    mat.map((item: any) => {
        matchedList.push(item);
        console.log(item);
    });
    // console.log("applied :"+appliedList);
    // console.log(+appliedList);
    // console.log("match :" + matchedList);
    // console.log("cancel :" + canceledList);
    // console.log(canceledList);
    return (
        <div className="reservation_page_container">
            <div className="reservation_page_inner_container">
                <CardList drag={dragCard} header={"신청 목록"} cardList = {appliedList} isAbleDrag={true} container={"card_list_container"} isEnterable={false} hoverText={"리스트 바깥으로 드래그 앤 드롭하여 취소"}></CardList>
                <ReservedCardList cardList={matchedList}></ReservedCardList>
                <CardList drag={(event : any, tmp : string)=>{return;}}header={"취소 목록"} cardList = {canceledList}  container={"card_list_container"}  isAbleDrag={false} isEnterable={false}></CardList>
            </div>
        </div>
    )
}

export default ReservationContainer;