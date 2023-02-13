import { useState } from "react";
import "../styles/widget/reserved-card.css"
import CancelModal from "../components/modal/CancelModal";
import DATE_TO_STRING from "../utils/ts/date_to_string";

function ReservedCard(props : any){
    const[clickCancel, setClickCancel] = useState(false);
    console.log(props.info);
    return(
        // 카드를 감싸는 outer
        <div className="reserved_card_outer">
            {/* 카드 본체 드래그 이벤트를 프롭스로 받아와 드래그 사용 */}
            <div className="reserved_card">
                <div className="reserved_card_header">
                    <div className="reserved_card_header_inner">
                        <div className="reserved_rt">
                            <div>멘토링</div>
                            <div className="cancle_btn"><img src="/img/trash_shape_red.png" alt="삭제" onClick={()=>setClickCancel(true)}></img>
                            </div>
                        </div>                
                        <div className="reserved_card_time">{DATE_TO_STRING(props.info.time)}</div>
                    </div>
                </div>                
                <div className="reserved_card_content_container">
                <img className="text_img" src="/img/name_shape_black.png" alt="이름"></img>
                    <span>{props.info.name}</span>
                </div>
                <div className="reserved_card_content_container">
                    <img className="text_img" src="/img/company_shape_black.png" alt="회사아이콘"></img>
                    <span> {props.info.company}</span>
                </div>
                <div className="reserved_card_content_container">
                    <img className="text_img" src="/img/job_shape_black.png" alt="직업"></img>
                    <span>{props.info.job}</span>
                </div>
                <div className="reserved_card_content_container">
                <img className="text_img" src="/img/number_shape_black.png" alt="기수"></img>
                    <span>{props.info.numberth}</span>
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
                <CancelModal info={props.info} closeModal={()=> setClickCancel(!clickCancel)}></CancelModal>
            )}  
        </div>
    )
}

export default ReservedCard;