import { attachRolling, removeRolling } from "../../store/rollingSlice";


function dragCard(event : any, elemClassName : string, containerClassName : string, isEnterCheck : boolean){
    // 요소 가져오기
    let elem = event.target;
    // 기존의 드래그를 없애기
    // elem.ondragstart = function(){
    //     return false;
    // }
    let mY = 0;
    let mX = 0;
    const classList = elem.classList;
    for(let i = 0; i < classList.length; i++){
        if(classList[i] === "enter_meeting_button"){
            return;
        }
    }

    // 드래그
    let onDrag = true;

    // 요소가 카드를 가리키게 하기
    while(elem.className !== elemClassName){
        elem = elem.parentElement;        
    }

    // 카드 아우터 요소를 가져오기
    const outer = elem.parentElement;
    // 카드 컨테이너 요소를 가져오기
    const container : any = document.getElementsByClassName(containerClassName)[0];

    // 카드가 이동가능하게 만들기
    elem.style.position = 'absolute';
    elem.style.zIndex = 1000;

    // 카드의 기존 위치 저장
    const leftPos = elem.style.left;
    const topPos = elem.style.top;

    // 카드를 body의 자식으로
    document.body.append(elem);

    // 드래그 위치에 따라 위치를 바꾸는 함수
    function moveAt(pageX : number,pageY : number){
        elem.style.left = pageX - elem.offsetWidth / 2 + 'px';
        elem.style.top = pageY - elem.offsetHeight / 2 + 'px';
    }

    // 처음 클릭했을 때 마우스위치로 이동
    moveAt(event.pageX, event.pageY);



    // 마우스가 움직이면 카드 위치 변경하게 할 함수
    function onMouseMove(event : any){
        // 현재 마우스 위치를 저장
        mY = event.pageY;
        mX = event.pageX;
        // 카드를 현재 마우스 위치로 이동시키는 함수
        moveAt(event.pageX,event.pageY);
    }

    // 마우스가 움직이면 함수 호출
    document.addEventListener('mousemove', onMouseMove);


    // 종료 부분
    if(!isEnterCheck){
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

        //마우스 클릭 해제시 원래대로
        elem.onmouseup = function(){
            document.removeEventListener('mousemove',onMouseMove);
            elem.onmouseup = null;
            outer.append(elem);
            elem.style.left = leftPos;
            elem.style.top = topPos;
            elem.style.zIndex = 'auto';
        }
    }
    else{
        //마우스 클릭 해제시 원래대로
        elem.onmouseup = function(){

            const conTop = window.pageYOffset + container.getBoundingClientRect().top;
            const conLeft = window.pageXOffset + container.getBoundingClientRect().left;
            if(conTop < mY && mY < conTop + container.offsetHeight && conLeft < mX && mX < conLeft + container.offsetWidth ){  
                if(window.confirm("추가합니까")){
                    // **********************
                    // 이 곳에 기능을 넣어야 함
                    // **********************
                }
                onDrag = false;
            }
            document.removeEventListener('mousemove',onMouseMove);
            elem.onmouseup = null;
            outer.append(elem);
            elem.style.left = leftPos;
            elem.style.top = topPos;
            elem.style.zIndex = 'auto';

            onDrag = false;
        }
    }
}

// 확대 축소에도 제자리에 있게 하자
async function dragRoll(event : any, elemClassName : string, containerClassName : string, dispatch : any, id : number, isAttached : number){
    // react 최상위 요소 가져오기
    const rootDiv = document.getElementById("root");
    // 요소 가져오기
    let elem = event.target;
    
    // 마우스 위치 저장할 변수
    let mY = 0;
    let mX = 0;
    
    // 대상 요소 가리키게 하기
    while(elem.className !== elemClassName){
        elem = elem.parentElement;        
    }

    // 카드 아우터 요소를 가져오기
    const outer = elem.parentElement;

    //컨테이너 관련 변수
    // 카드 컨테이너 요소를 가져오기
    const container : any = document.getElementsByClassName(containerClassName)[0];
    // 대상 컨테이너의 위치 구하기 (좌상포인트)
    const conTop = window.pageYOffset + container.getBoundingClientRect().top;
    const conLeft = window.pageXOffset + container.getBoundingClientRect().left;
    // 대상 컨테이너의 너비와 높이 구하기
    const conW = container.offsetWidth;
    const conH = container.offsetHeight;

    // 컨테이너의 자식으로
    if(rootDiv){
        rootDiv.append(elem);
    }

    // 카드가 이동가능하게 만들기
    elem.style.position = 'absolute';
    elem.style.zIndex = 1000;
    

    // 드래그 위치에 따라 위치를 바꾸는 함수
    function moveAt(pageX : number,pageY : number){
        elem.style.left = pageX - elem.offsetWidth / 2 + 'px';
        elem.style.top = pageY - elem.offsetHeight / 2 + 'px';

        // 페이퍼 밖으로 마우스가 나가기 전까지는 종이 위치 고정
        if(pageX - elem.offsetWidth / 2  < conLeft && pageX - elem.offsetWidth / 2  - conLeft > -elem.offsetWidth / 2){
            elem.style.left = conLeft  + "px";
        }
        if(pageY - elem.offsetHeight / 2  < conTop && pageY - elem.offsetHeight / 2  - conTop > -elem.offsetHeight / 2){
            elem.style.top = conTop  + "px";
        }
        if(conLeft + conW < pageX + elem.offsetWidth / 2 && conLeft + conW - (pageX + elem.offsetWidth / 2) > -elem.offsetWidth / 2){
            elem.style.left = conLeft + conW - elem.offsetWidth + "px";            
        }
        if(conTop + conH < pageY + elem.offsetHeight / 2 && conTop + conH - (pageY + elem.offsetHeight / 2) > -elem.offsetWidth / 2){
            elem.style.top = conTop + conH - elem.offsetHeight + "px";            
        }
    }

    // 처음 클릭했을 때 마우스위치로 이동
    moveAt(event.pageX, event.pageY);

    

    // 마우스가 움직이면 카드 위치 변경하게 할 함수
    function onMouseMove(event : any){
        mY = event.pageY;
        mX = event.pageX;
        moveAt(event.pageX,event.pageY);
    }

    // 마우스가 움직이면 함수 호출
    if(rootDiv){
        rootDiv.addEventListener('mousemove', onMouseMove);
    }

    //마우스 클릭 해제시 원래대로
    function mouseUP(){
        if(conTop < mY && mY < conTop + conH && conLeft < mX && mX < conLeft + conW ){  
                // 마우스 위치에서 컨테이너의 위치를 빼고 조정값을 빼주어 위치 지정
                container.append(elem);
                elem.style.left = mX - conLeft - 174  + "px";
                elem.style.top = mY - conTop - 48 + "px";        
                if("나중에 사용"){
                // const elemTop = elem.getBoundingClientRect().top;
                // const elemLeft = elem.getBoundingClientRect().left;

                // 페이퍼 밖으로 쪽지가 나가면 안으로 들인다.
                // if(elemLeft  < conLeft){
                //     elem.style.left = conLeft  + "px";
                // }
                // if(elemTop < conTop){
                //     elem.style.top = conTop  + "px";
                // }
                // if(conLeft + conW < elemLeft + elem.offsetWidth){
                //     elem.style.left = conLeft + conW - elem.offsetWidth + "px";            
                // }if(conTop + conH < elemTop + elem.offsetHeight){
                //     elem.style.top = conTop + conH - elem.offsetHeight + "px";            
                // }
                }

                // *************************
                // 이 곳에 기능을 넣어야 함
                // *************************
                if(isAttached === 0){
                    elem.remove();
                }
                dispatch(attachRolling({
                    id: id,
                    posX: mX - conLeft - 174,
                    posY: mY -conTop - 48,
                }));        
        }
        else{            
            // *************************
            // 이 곳에 기능을 넣어야 함
            // *************************    
            dispatch(removeRolling({
                id:id,
                posX: 0,
                posY:0,
            }));
            
            if(isAttached === 1){
                elem.remove();
            }
            else{
                outer.append(elem);
                elem.style.position = "static";
                elem.style.zIndex = "auto";
            }    
                
            }
        if(rootDiv){
            rootDiv.removeEventListener('mousemove',onMouseMove);
            elem.removeEventListener('onmouseup', mouseUP);
        }
    }
    elem.addEventListener('mouseup',mouseUP);

}

export {dragCard, dragRoll};