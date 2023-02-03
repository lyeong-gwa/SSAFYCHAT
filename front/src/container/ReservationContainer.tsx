import CardList from "../components/common/CardList";
import ReservedCardList from "../components/mentoring/ReservedCardList";
import ReservedList from "../components/mentoring/ReservedList";
import "../styles/container/reservation-container.css"
import { dragCard } from "../utils/ts/move";

function ReservationContainer(){
    const cardList = [["김도원","네이버","백엔드 개발자","2023-01-01"],["김겨울","SMENT","가수","2023-01-01"],["3","SMENT","가수","2023-01-01"],["4","SMENT","가수","2023-01-01"],["5","SMENT","가수","2023-01-01"],["6","SMENT","가수","2023-01-01"]];
    
    return (
        <div className="reservation_page_container">
            <div className="reservation_page_inner_container">
                <CardList drag={dragCard} header={"신청 목록"} cardList = {cardList}></CardList>
                <ReservedCardList></ReservedCardList>
                <CardList drag={()=>{return;}} header={"취소 목록"} cardList = {[]}></CardList>
                <ReservedList></ReservedList>
            </div>
        </div>
    )
}

export default ReservationContainer;