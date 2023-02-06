import "../styles/widget/reserved-card.css"



function ReservedCard(props : any){
    return(
        // 카드를 감싸는 outer
        <div className="reserved_card_outer">
            {/* 카드 본체 드래그 이벤트를 프롭스로 받아와 드래그 사용 */}
            <div className="reserved_card" onMouseDown={(event)=>{
                props.drag(event,"reserved_card");
            }}>
                <div className="reserved_card_header">                
                    <ruby>{props.info.time}<rt>멘토링</rt></ruby>
                </div>                
                <div className="reserved_card_content_container">
                    {props.info.name}
                </div>
                <div className="reserved_card_content_container">
                  회사
                </div>
                <div className="reserved_card_content_container">
                {props.info.job}
                </div>
                <div className="reserved_card_content_container">
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
        </div>
    )
}

export default ReservedCard;