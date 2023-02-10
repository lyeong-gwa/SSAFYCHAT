import "../../styles/components/rollingpaper/rolling-card-list.css";
import Sticky from "../../widget/Sticky";
function RollingCardList(props : any){
    
    const list = props.list;

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