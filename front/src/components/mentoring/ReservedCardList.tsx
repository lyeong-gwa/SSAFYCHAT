import "../../styles/components/mentoring/reserved-card-list.css";
import ReservedCard from "../../widget/ReservedCard";
import ArrowButton from "../../widget/ArrowButton";
import { dragCard } from "../../utils/ts/move";


// function dragCard(event : any){
//     // 요소 가져오기
//     let elem = event.target;
//     // 기존의 드래그를 없애기
//     // elem.ondragstart = function(){
//     //     return false;
//     // }
    
//     if(elem.className === "reserved_card_button"){
//         return;
//     }

//     // 드래그
//     let onDrag = true;

//     // 요소가 카드를 가리키게 하기
//     while(elem.className !== "reserved_card"){
//         elem = elem.parentElement;        
//     }
//     // 카드 아우터 요소를 가져오기
//     const outer = elem.parentElement;
//     // 카드 컨테이너 요소를 가져오기
//     const container = outer.parentElement;

//     // 카드가 이동가능하게 만들기
//     elem.style.position = 'absolute';
//     elem.style.zIndex = 1000;

//     // 카드의 기존 위치 저장
//     const leftPos = elem.style.left;
//     const topPos = elem.style.top;

//     // 카드를 body의 자식으로
//     document.body.append(elem);

//     // 드래그 위치에 따라 위치를 바꾸는 함수
//     function moveAt(pageX : number,pageY : number){
//         elem.style.left = pageX - elem.offsetWidth / 2 + 'px';
//         elem.style.top = pageY - elem.offsetHeight / 2 + 'px';
//     }

//     // 처음 클릭했을 때 마우스위치로 이동
//     moveAt(event.pageX, event.pageY);

    

//     // 마우스가 움직이면 카드 위치 변경하게 할 함수
//     function onMouseMove(event : any){
//         // 
//         moveAt(event.pageX,event.pageY);
//     }

//     // 마우스가 움직이면 함수 호출
//     document.addEventListener('mousemove', onMouseMove);

//     container.onmouseleave = function(){
//         if(onDrag){
//             // **********************
//             // 이 곳에 기능을 넣어야 함
//             // **********************
//             alert("삭제합니다");
//             onDrag = false;
//         }
//     }
//     container.onmouseover = function(){
//         onDrag = false;
//     }

//     // 마우스클릭 해제시 원래대로
//     elem.onmouseup = function(){
//         document.removeEventListener('mousemove',onMouseMove);
//         elem.onmouseup = null;
//         outer.append(elem);
//         elem.style.left = leftPos;
//         elem.style.top = topPos;
//         elem.style.zIndex = 'auto';
//     }
// }

function enterMeeting(event : any){
    alert('입장합니다.');
}

function ReservedCardList(props : any){
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
            <ArrowButton text={"<"}></ArrowButton>
        </div>
        
        {/* 카드리스트 */}
        <div className="reserved_card_container">
            <ReservedCard drag={dragCard} button={enterMeeting}></ReservedCard>
        </div>

            
        {/* 우측 화살표 */}
        <div className="reserved_card_list_arrow">
            <ArrowButton text={">"}></ArrowButton>
        </div>

        </div>


        
    </div>
    )
}

export default ReservedCardList;