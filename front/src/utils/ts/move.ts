
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
        mY = event.pageY;
        mX = event.pageX;
        moveAt(event.pageX,event.pageY);
    }

    // 마우스가 움직이면 함수 호출
    document.addEventListener('mousemove', onMouseMove);
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

        container.onmouseover = function(){
            console.log(onDrag)
           
        }  

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
            // 이걸로 테스트 해보기 /////////////////////////////
            // event.pageX, event.pageY

        //     elem.style.left = pageX - elem.offsetWidth / 2 + 'px';
        // elem.style.top = pageY - elem.offsetHeight / 2 + 'px';






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

export {dragCard};