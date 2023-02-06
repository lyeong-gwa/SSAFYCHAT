import "../../styles/components/mentoring/reserved-card-list.css";
import ReservedCard from "../../widget/ReservedCard";
import ArrowButton from "../../widget/ArrowButton";
import { dragCard } from "../../utils/ts/move";
import { useState } from "react";
import { useNavigate } from "react-router";

function ReservedCardList(props : any){
    const navigate = useNavigate();
    const list = [];
    let [startIdx,setIdx] = useState(0);

    for(let i = startIdx; i < startIdx+4&&props.cardList.length; ++i){
        let info = props.cardList[i];
        list.push(<ReservedCard key={i} drag={dragCard} button={()=>{
            navigate("/meeting");
            alert('입장합니다.');
        }} info={info}></ReservedCard>);
    }

    return (
    // 카드리스트 전체를 감싸는 컨테이너
    <div className="reserved_card_list_container">
        {/* 헤더 */}
        <div className="reserved_card_list_header">
                <div className="header_text">
                    멘토링 목록
                </div>
           </div>
       
        {/* 카드리스트와 헤더를 감싸는 컨테이너 */}
        <div className="reserved_card_list_inner_container">
        {/* 좌 화살표 */}
        <div className="reserved_card_list_arrow">
            <ArrowButton text={"<"}  onMouseDown={()=>{
                    if(0 < startIdx){
                        setIdx(startIdx-1);
                    }
                }}></ArrowButton>
        </div>
        
        {/* 카드리스트 */}
        <div className="reserved_card_container">
            {list}
        </div>

            
        {/* 우측 화살표 */}
        <div className="reserved_card_list_arrow">
            <ArrowButton text={">"} onMouseDown={()=>{
                    if(startIdx+4 < props.cardList.length){
                        setIdx(startIdx+1);
                    }
                }}></ArrowButton>
        </div>

        </div>


        
    </div>
    )
}

export default ReservedCardList;