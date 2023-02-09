import "../../styles/components/rollingpaper/rolling-card-list.css";
import Sticky from "../../widget/Sticky";
function RollingCardList(props : any){
    return(
        <div className="rolling_card_list">
            <div className="rolling_card_list_container">
                <div className="rolling_card_list_inner_container">
                    <Sticky closeList={props.closeList} text="길지 않은 멘토링 시간 동안, 좋은 정보들을 제공해주신 멘토님 감사드립니다. 이번 채용 공고에 지원해서 꼭 같은 부서에서 만날 수 있었으면 좋겠습니다. 연락드리겠습니다!"></Sticky>
                    <Sticky closeList={props.closeList} text="길지 않은 멘토링 시간 동안, 좋은 정보들을 제공해주신 멘토님 감사드립니다. 이번 채용 공고에 지원해서 꼭 같은 부서에서 만날 수 있었으면 좋겠습니다. 연락드리겠습니다!"></Sticky>
                    <Sticky closeList={props.closeList} text="길지 않은 멘토링 시간 동안, 좋은 정보들을 제공해주신 멘토님 감사드립니다. 이번 채용 공고에 지원해서 꼭 같은 부서에서 만날 수 있었으면 좋겠습니다. 연락드리겠습니다!"></Sticky>
                    <Sticky closeList={props.closeList} text="길지 않은 멘토링 시간 동안, 좋은 정보들을 제공해주신 멘토님 감사드립니다. 이번 채용 공고에 지원해서 꼭 같은 부서에서 만날 수 있었으면 좋겠습니다. 연락드리겠습니다!"></Sticky>                  
                </div>
            </div>
        </div>
    )
}

export default RollingCardList;