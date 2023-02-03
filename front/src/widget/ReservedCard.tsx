import "../styles/widget/reserved-card.css"



function ReservedCard(props : any){
    return(
        <div className="reserved_card_outer">
            <div className="reserved_card" onMouseDown={(event)=>{
                props.drag(event,"reserved_card");
            }}>
                <div className="reserved_card_header">                
                    <ruby>2022.02.02<rt>멘토링</rt></ruby>
                </div>                
                <div className="reserved_card_content_container">
                    이름
                </div>
                <div className="reserved_card_content_container">
                    회사
                </div>
                <div className="reserved_card_content_container">
                    직무
                </div>
                <div className="reserved_card_content_container">
                    기수
                </div>
                <div className="reserved_card_button_container">                   
                    <div className="reserved_card_button" onClick={(event)=>{
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