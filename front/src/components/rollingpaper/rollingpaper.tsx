import "../../styles/components/rollingpaper/rollingpaper.css";
// import Sticky from "../../widget/Sticky";
import RollingCardList from "./RollingCardList";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { changeBanner } from "../../store/userSlice"
import { getReview } from "../../api/review";
import Sticky from "../../widget/Sticky";
import { getRollings } from "../../store/rollingSlice";

// function getRollings(){
//     console.log("getRollings");
//     getReview((success : any)=>{
//         console.log(success)
        
//     },(fail : any)=>{
//         console.log(fail)
//     })
// }


function RollingPaper() {
    const imgUrlStar = "/img/Star.png"
    const imgUrlclean = "/img/clean.png"
    const imgUrlsave = "/img/save.png"
    const dispatch = useAppDispatch();
    dispatch(changeBanner("롤링페이퍼"));
    useEffect(()=>{
        getReview((success : any)=>{
            console.log(success)
            dispatch(getRollings(success.data))
        },(fail : any)=>{
            console.log(fail)
        })
    })

    const[clickBtn, setClickBtn] = useState(false);
    const colorClassList =["sticky_purple","sticky_green","sticky_red","sticky_yellow","sticky_blue"];

    // let [attachedList, setAttachedList] = useState([<></>]);
    let attachedList = []
    const cardList = useAppSelector(state=>state.rolling.rollings);
    console.log(cardList + "RP");
    let newList = [];
    for(let i = 0; i < cardList.length; i++){
        if(cardList[i].attached === 1){
            newList.push(<Sticky rolling={cardList[i]}  key={i} colorClass = {cardList[i].color} closeList={()=>{return;}}></Sticky>)
        }
    }
    attachedList = newList;
    // setAttachedList(newList);
    return (
        <div className="rcontainer">
            <div className="dashboard">
                <div className="dashboard_header">

                    <div className="dashboard_header_icon">
                        <img src={imgUrlStar} alt="Star" />
                    </div>
                    <div className="dashboard_header_title">
                        <p className="d_h_t_p">멘티들이 남긴 감사의 편지</p>
                    </div>
                    <div className="dashboard_controler">
                        <div className="clean">
                            <img className="clean_name" src={imgUrlclean} alt="Clean" />
                        </div>
                        <div className="save" onClick={()=>{
                            setClickBtn(!clickBtn);
                        }}>
                            <img className="save_img" src={imgUrlsave} alt="Save" />
                        </div>
                    </div>
                </div>
                <div className="dashboard_main">
                {/* 버튼을 클릭하면 */}
                {clickBtn && (
                    <RollingCardList closeList={()=>setClickBtn(false)}></RollingCardList>
                    )}  
                    {/* 롤링페이퍼 컨텐츠가 올 공간 입니다. */}
                    {attachedList}
                </div>
            </div>
            {/* <div className="sticky_list_container">
                <div className="upper_arrow"></div>
                <div>
                <Sticky title="감사합니다." text="덕분에 도움이 많이 됐어요"></Sticky>
                </div>
                <div className="lower_arrow"></div>
            </div> */}
            
        </div>
    )
}

export default RollingPaper;