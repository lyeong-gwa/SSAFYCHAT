import "../styles/widget/sticky-style.css"
import { dragRoll } from "../utils/ts/move";
function Sticky(props: any){
    
    return(
        // event : any, elemClassName : string, containerClassName : string, isEnterCheck : boolean
        <div className="sticky_main" onClick={()=>{console.log(456)}} onMouseDown={
            (event:any)=>{console.log(123);dragRoll(event,"sticky_main","dashboard_main",true,props.closeList)}
        }>
            <div className={props.colorClass}>
            {/* <div className="title">
                {props.title}
                조원재
            </div> */}
                <div className="text">
                    {props.text}
                </div>
            </div>
        </div>
    )
}

export default Sticky;