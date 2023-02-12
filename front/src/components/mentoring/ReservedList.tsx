import { useNavigate } from "react-router";
import "../../styles/components/mentoring/reserved-list.css"
import { useAppSelector } from '../../hooks/hooks'
import { useState } from "react";
import CancelModal from "../modal/CancelModal";

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
    const[clickCancel, setClickCancel] = useState(false);
    return(
        <tr className="reserved_list_tr_body" 
        draggable='true'
        onMouseDown={(event)=>{
            dragItem(event);
        }}
        >
            <td>{props.reserved.date}</td>
            <td>{props.reserved.name}</td>
            <td>{props.reserved.cardinal}</td>
            <td>{props.reserved.email}</td>
            <td className="reserved_list_btn_container">
                <div className="reserved_list_enter_button enter_meeting_button" onClick={(event)=>{
                props.func(event);
                }} >입장</div>
                <div className="reserved_list_cancel_btn">
                    <img src="/img/trash_shape_red.png" alt="취소" onClick={()=>{setClickCancel(!clickCancel)}}>
                    </img>
                </div>
            </td>
            {clickCancel && (
                <CancelModal closeModal={()=> setClickCancel(!clickCancel)}></CancelModal>
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
    const reservedList = useAppSelector((state)=>state.mentoring.reservedMentorings);
    const list = [];
    for(let i = 0; i < reservedList.length; ++i){
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