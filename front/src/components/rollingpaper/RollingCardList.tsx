import "../../styles/components/rollingpaper/rolling-card-list.css";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import Sticky from "../../widget/Sticky";
function RollingCardList(props : any){
    const list : any = [];
    const cardList = useAppSelector(state=>state.rolling.rollings);
    console.log(cardList + "RC");
    for(let i = 0; i < cardList.length; ++i){
        if(cardList[i].attached === 0){
            list.push(<Sticky rolling={cardList[i]} key={i} colorClass = {cardList[i].color} closeList={()=>props.closeList}></Sticky>);
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