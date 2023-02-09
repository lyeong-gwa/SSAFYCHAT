import "../styles/widget/sticky-style.css"
import { dragRoll } from "../utils/ts/move";
function Sticky(props: any){
    return(
        // event : any, elemClassName : string, containerClassName : string, isEnterCheck : boolean
        <div className="sticky_main" onMouseDown={
            (event:any)=>{dragRoll(event,"sticky_main","dashboard_main",true)}
        }>
            {/* <div className="title">
                {props.title}
                조원재
            </div> */}
            <div className="text">
                {/* {props.text} */}
                {/* 길지 않은 멘토링 시간 동안, 좋은 정보들을 제공해주신 멘토님 감사드립니다. 이번 채용 공고에 지원해서 꼭 같은 부서에서 만날 수 있었으면 좋겠습니다. 연락드리겠습니다! */}
            </div>
        </div>
    )
}

export default Sticky;