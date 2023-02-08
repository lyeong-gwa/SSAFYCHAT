import CardList from "../components/common/CardList";
import ReservedCardList from "../components/mentoring/ReservedCardList";
import "../styles/container/reservation-container.css"
import { dragCard } from "../utils/ts/move";

function ReservationContainer(){
    const cardList = [["김도원","네이버","백엔드 개발자","2023-01-01"],["김겨울","SMENT","가수","2023-01-01"],["3","SMENT","가수","2023-01-01"],["4","SMENT","가수","2023-01-01"],["5","SMENT","가수","2023-01-01"],["6","SMENT","가수","2023-01-01"]];
    const reCardList = [
        {
            time:"2022.02.02",
            name:"김겨울",
            job:"아이돌",
            num: "7전8기",
        },
        {
            time:"2022.02.02",
            name:"2",
            job:"아이돌",
            num: "7전8기",
        },{
            time:"2022.02.02",
            name:"3",
            job:"아이돌",
            num: "7전8기",
        },{
            time:"2022.02.02",
            name:"4",
            job:"아이돌",
            num: "7전8기",
        },{
            time:"2022.02.02",
            name:"5",
            job:"아이돌",
            num: "7전8기",
        },{
            time:"2022.02.02",
            name:"6",
            job:"아이돌",
            num: "7전8기",
        }
    ]
    return (
        <div className="reservation_page_container">
            <div className="reservation_page_inner_container">
                <CardList drag={dragCard} header={"신청 목록"} cardList = {cardList} isAbleDrag={true} container={"card_list_container"} isEnterable={false} hoverText={"리스트 바깥으로 드래그 앤 드롭하여 취소"}></CardList>
                <ReservedCardList cardList={reCardList}></ReservedCardList>
                <CardList drag={(event : any, tmp : string)=>{return;}}header={"취소 목록"} cardList = {cardList}  container={"card_list_container"}  isAbleDrag={false} isEnterable={false}></CardList>
            </div>
        </div>
    )
}

export default ReservationContainer;