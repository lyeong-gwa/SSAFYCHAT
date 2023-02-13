import { useNavigate } from "react-router";
import "../../styles/components/mentoring/reserved-list.css"
import { useAppSelector, useAppDispatch } from '../../hooks/hooks'
import { useState } from "react";
import { setMentoringId } from "../../store/mentoringSlice";
import CancelModal from "../modal/CancelModal";
import DATE_TO_STRING from "../../utils/ts/date_to_string";

function whatMyNick(nick: number){
    console.log(nick);
    switch (nick){
        case 1:
            return '1기';
        case 2:
            return '2기';
        case 3:
            return '3기';
        case 4:
            return '4기';
        case 5:
            return '5기로 극복';
        case 6:
            return '열정 핫식스';
        case 7:
            return '럭키세븐';
        case 8:
            return '7전8기';
        case 9:
            return '9뤠이트';
        case 10:
            return '10기';
    }
}

function dragItem(event : any){
    let elem = event.target;
    if(elem.className === "reserved_list_enter_button"){
        return;
    }
    while(elem.className !== "reserved_list_tr_body" ){
        elem = elem.parentElement;
    }
    let container = elem.parentElement.parentElement.parentElement;
    let onDrag = true;

    container.onmouseleave = function(){
        if(onDrag){            
            if(window.confirm("삭제합니까")){
                // **********************
                // 이 곳에 기능을 넣어야 함
                // **********************
            }
            onDrag = false;
        }
    }
    container.onmouseover = function(){
        onDrag = false;
    }
    elem.onmouseup = function(){
        onDrag = false;
    }
}


function ReservedListItem(props : any){
    
    console.log(useAppSelector(state => state.mentoring.mentoringId));
    let dispatch = useAppDispatch();
    const[clickCancel, setClickCancel] = useState(false);
    return(
        <tr className="reserved_list_tr_body" 
        draggable='true'
        onMouseDown={(event)=>{
            dragItem(event);
        }}
        >
            <td>{DATE_TO_STRING(props.reserved.time)}</td>
            <td>{props.reserved.name}</td>
            <td>{whatMyNick(props.reserved.numberth)}</td>
            <td>{props.reserved.email}</td>
            <td className="reserved_list_btn_container">
                <div className="reserved_list_enter_button enter_meeting_button" onClick={(event)=>{
                    dispatch(setMentoringId(props.reserved.mentoringId));
                    props.func(event);
                }} >입장</div>
                <div className="reserved_list_cancel_btn">
                    <img src="/img/trash_shape_red.png" alt="취소" onClick={()=>{setClickCancel(!clickCancel)}}>
                    </img>
                </div>
            </td>
            {clickCancel && (
                <CancelModal info={props.info} closeModal={()=> setClickCancel(!clickCancel)}></CancelModal>
            )}  
        </tr>
    )
}

function enterMeeting(event : any, navigate : any){
    alert('입장합니다.');
    navigate("/meeting");
}

function ReservedList(props : any){
    const navigate = useNavigate();
    const reservedList = useAppSelector((state)=>state.mentoring.appointmentList.matches);
    const list = [];
    for(let i = 0; i < reservedList.length; ++i){
        console.log(reservedList[i]);
        list.push(<ReservedListItem key={i} reserved={reservedList[i]}  func={(event : any)=>{
            enterMeeting(event, navigate);
       }}></ReservedListItem> )
    }


    return (
        <div className="reserved_list_container">
            <div className="reserved_list_header">
                예약된 멘토링
            </div>
            <div className="reserved_list_table_container">
            <table className="reserved_list_table">
                <thead>
                    <tr className="reserved_list_tr_head">
                       <th>날짜</th>
                       <th>이름</th>
                       <th>기수</th>
                       <th>이메일</th>
                       <th></th>
                    </tr>
                </thead>
                <tbody className="reserved_list_tbody">
                    {list}              
                </tbody>
            </table>
            </div>
        </div>
        
    )
}

export default ReservedList;