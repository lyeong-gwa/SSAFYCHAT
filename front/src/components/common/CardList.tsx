import "../../styles/components/common/card-list.css";
import {useState} from 'react';
import ArrowButton from "../../widget/ArrowButton";
import ReservationCard from "../../widget/ReservationCard";

function CardList(props : any){

    let cards = [];
    let [startIdx,setIdx] = useState(0);

    for(let i = startIdx; i < startIdx+4&&props.cardList.length; ++i){
        let t = props.cardList[i];
        cards.push(<ReservationCard key={i} drag={props.drag} info={[t[0],t[1],t[2],t[3]]}></ReservationCard>)
    }

    return (
    // 카드리스트 전체를 감싸는 컨테이너
    <div className="card_list_container">
            {/* 헤더 */}
            <div className="card_list_header">
                <div className="header_text">
                    {props.header}
                </div>
           </div>

        {/* 카드리스트와 헤더를 감싸는 컨테이너 */}
        <div className="card_list_inner_container">
            {/* 좌 화살표 */}
            <div className="card_list_arrow"  onMouseDown={()=>{
                    if(0 < startIdx){
                        setIdx(startIdx-1);
                    }
                    console.log(startIdx);
                }}>
                <ArrowButton text="<"></ArrowButton>
            </div>

            {/* 카드리스트 */}
            <div className="card_container">
                {/* 카드 */}
                {cards}
            </div>

            {/* 우측 화살표 */}
            <div className="card_list_arrow"  onMouseDown={()=>{
                    if(startIdx+4 < props.cardList.length){
                        setIdx(startIdx+1);
                    }
                    console.log(startIdx);
                }}>
                <ArrowButton text=">"></ArrowButton>
            </div>
        </div>


    </div>
    )
}

export default CardList;