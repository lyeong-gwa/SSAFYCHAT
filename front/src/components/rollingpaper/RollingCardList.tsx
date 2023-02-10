import "../../styles/components/rollingpaper/rolling-card-list.css";
import Sticky from "../../widget/Sticky";
function RollingCardList(props : any){
    const list : any = [];
    console.log(props.cardList);
    for(let i = 0; i < props.cardList.length; ++i){
        if(!props.cardList[i].attached){
            list.push(<Sticky key={i} colorClass = {props.cardList[i].color} closeList={()=>props.closeList} text={props.cardList[i].content}></Sticky>);
        }
    }

    return(
        <div className="rolling_card_list">
            <div className="rolling_card_list_container">
                <div className="rolling_card_list_inner_container">
                    {list}
                </div>
            </div>
        </div>
    )
}

export default RollingCardList;