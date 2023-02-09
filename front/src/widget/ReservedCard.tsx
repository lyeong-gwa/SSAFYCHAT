import { useState } from "react";
import "../styles/widget/reserved-card.css"
import CancelModal from "../components/modal/CancelModal";


function ReservedCard(props : any){
    const[clickCancel, setClickCancel] = useState(false);

    return(
        // 카드를 감싸는 outer
        <div className="reserved_card_outer">
            {/* 카드 본체 드래그 이벤트를 프롭스로 받아와 드래그 사용 */}
            <div className="reserved_card"  onClick={()=>setClickCancel(true)}>
                <div className="reserved_card_header">
                    <div className="reserved_card_header_inner">
                        <div className="reserved_rt">멘토링</div>                
                        <div className="reserved_card_time">{props.info.time}</div>
                    </div>
                </div>                
                <div className="reserved_card_content_container">
                <img className="text_img" src="/img/name_shape_black.png" alt="이름"></img>
                    {props.info.name}
                </div>
                <div className="reserved_card_content_container">
                    <img className="text_img" src="/img/company_shape_black.png" alt="회사아이콘"></img>
                  회사
                </div>
                <div className="reserved_card_content_container">
                    <img className="text_img" src="/img/job_shape_black.png" alt="직업"></img>
                    {props.info.job}
                </div>
                <div className="reserved_card_content_container">
                <img className="text_img" src="/img/number_shape_black.png" alt="기수"></img>
                {props.info.num}
                </div>
                <div className="reserved_card_button_container">  
                    {/* 버튼이벤트를 props로 받아와 사용 */}
                    <div className="reserved_card_button enter_meeting_button" onClick={(event)=>{
                        props.button(event);
                    }}>
                        입장하기
                    </div>                                       
                </div>
            </div>
            
            {clickCancel && (
                <CancelModal closeModal={()=> setClickCancel(!clickCancel)}></CancelModal>
            )}  
        </div>
    )
}

export default ReservedCard;