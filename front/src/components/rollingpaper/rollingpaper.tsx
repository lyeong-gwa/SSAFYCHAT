import "../../styles/components/rollingpaper/rollingpaper.css";

function RollingPaper() {
    const imgUrlStar = "/img/Star.png"
    const imgUrlclean = "/img/clean.png"
    const imgUrlsave = "/img/save.png"
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
                            <img src={imgUrlclean} alt="Clean" />
                        </div>
                        <div className="save">
                            <img src={imgUrlsave} alt="Save" />
                        </div>
                    </div>
                </div>
                <div className="dashboard_main">
                    {/* 롤링페이퍼 컨텐츠가 올 공간 입니다. */}
                </div>
            </div>
            <div className="sticky_list_container">
                <div className="upper_arrow"></div>
                <div className="sticky_main">

                </div>
                <div className="lower_arrow"></div>
            </div>
        </div>
    )
}

export default RollingPaper;