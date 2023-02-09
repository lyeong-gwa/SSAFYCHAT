import "../../styles/components/rollingpaper/rollingpaper.css";
// import Sticky from "../../widget/Sticky";
import RollingCardList from "./RollingCardList";
import { useState } from "react";



function RollingPaper() {
    const imgUrlStar = "/img/Star.png"
    const imgUrlclean = "/img/clean.png"
    const imgUrlsave = "/img/save.png"
    const[clickBtn, setClickBtn] = useState(false);
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
                            console.log("리스트 나와라");
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