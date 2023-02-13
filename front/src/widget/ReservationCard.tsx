import "../styles/widget/reservation-card.css"
import { useAppDispatch,useAppSelector } from "../hooks/hooks";
import { getAppointment, getReservation } from "../store/mentoringSlice";
import { cancelReservation } from "../api/mentoring";
import { setAppointmentApi } from "../api/mentoring";
import DATE_TO_STRING from "../utils/ts/date_to_string";


function ReservationCard(props : any){

    // interface matchInfo{
    //     name:string,
    //     studentNumber:string,
    //     numberth:number,
    //     email:string,
    //     time:string,
    //     mentoringId:number,
    //   }
    const dispatch = useAppDispatch();
    let funcAfterDrag : any;
    const reservationList = useAppSelector(state => state.mentoring.reservationList);
    const appointmentList = useAppSelector(state => state.mentoring.appointmentList);
    if(props.isEnterable){
        funcAfterDrag = async ()=>{
            for(let i = 0; i < appointmentList.applys.length; ++i){
                
                console.log("listId " + appointmentList.applys[i].applyMentoringId );
                
                if(appointmentList.applys[i].applyMentoringId === props.info[4]){
                    console.log("아이디 "+ props.info[4]);
                    console.log("시간 " + props.info[3]);
                    setAppointmentApi({applyMentoringId:props.info[4],time:props.info[3]},(success : any)=>{
                        console.log(success);
                        
                        appointmentList.matches.push({
                            name:appointmentList.applys[i].name,
                            studentNumber:appointmentList.applys[i].studentNumber,
                            numberth: appointmentList.applys[i].numberth,
                            email: appointmentList.applys[i].email,
                            time: appointmentList.applys[i].times[0],
                            mentoringId: appointmentList.applys[i].applyMentoringId,
                        });
                        appointmentList.applys.splice(i,1);
                        dispatch(getAppointment(appointmentList));
                        return true;
                    },(fail : any)=>{
                        console.log(fail);
                        console.log("실패 아이디 " + props.info[4]);
                        console.log("실패 시간 " + props.info[3]);
                        return false;
                    });
                    // 이곳에 api호출
                }
            }
        }
    }
    else{
        funcAfterDrag = async ()=>{
            for(let i = 0; i < reservationList.appliedList.length; ++i){
                if(reservationList.appliedList[i].applyMentoringId === props.info[4]){
                    cancelReservation({applyMentoringId:props.info[4]},(success : any)=>{
                        console.log(success);
                        reservationList.appliedList.splice(i,1);
                        dispatch(getReservation(reservationList));
                        return true;
                    },(fail:any)=>{
                        console.log(fail)
                        return false;
                    })
                }
            }
        }
    }

    return(
        <div className="card_outer">            
            <div className={"reservation_card" + (props.isAbleDrag ? "" : " isNotAbleDrag")} onMouseDown={(event)=>{
                props.drag(event,"reservation_card",props.container,props.isEnterable,funcAfterDrag);            
        }}>
                <div className = "cancel_description">
                    {props.hoverText}
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
                    {DATE_TO_STRING(props.info[3])}
                </div>
          </div>
        </div>
    )
}

export default ReservationCard;