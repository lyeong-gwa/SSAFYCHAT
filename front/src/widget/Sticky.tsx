import { useAppDispatch } from "../hooks/hooks";
import "../styles/widget/sticky-style.css"
import { dragRoll } from "../utils/ts/move";
import { patchReview } from "../api/review";
function Sticky(props: any){
    const dispacth = useAppDispatch();
    return(
        <div>
        <div style={{
            position: props.rolling.attached ? "absolute" : "static",
            left : props.rolling.posX +"px",
            top : props.rolling.posY +"px"
        }}
         className="sticky_main" onClick={()=>{console.log(456)}} onMouseDown={
            (event:any)=>{dragRoll(event,"sticky_main","dashboard_main", dispacth,patchReview, props.rolling.id, props.rolling.attached);}
        }>
            <div className={props.rolling.color}>
                <div className="text">
                    {props.rolling.content}
                </div>
            </div>
        </div>
        </div>
    )
}

export default Sticky;