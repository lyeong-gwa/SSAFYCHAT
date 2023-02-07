import "../styles/widget/reservation-card.css"


function ReservationCard(props : any){
    return(
        <div className="card_outer">            
            <div className="reservation_card" onMouseDown={(event)=>{
                props.drag(event,"reservation_card");            
        }}>
                <div className = "cancel_description">
                    리스트 바깥으로 드래그 앤 드롭하여 취소
                </div>
                <div className="card_name">
                    {props.info[0]}
                </div>
                <div className="card_info">
                    {props.info[1]}
                </div>
                <div className="card_info">
                    {props.info[2]}
                </div>
                <div className="card_time">
                    {props.info[3]}
                </div>
          </div>
        </div>
    )
}

export default ReservationCard;