import "../../styles/components/common/card-banner.css"
function CardBanner (){
    return (
        <div className="card_banner" >
            <div className="cell_a"></div>
            <div className="cell_b"></div>
            <div className="cell_c">
                <div className="card_banner_content">
                    <p className="card_banner_header">싸피챗이 무엇인가요?</p>
                    <p className="card_banner_main">싸피챗을 시작해 보세요!</p>
                    <p className="card_banner_main">당신의 커리어를 위해</p>
                    <button className="card_banner_button">시작하기</button>
                </div>
            </div>
            <div className="cell_d"></div>
        </div>
    )
}

export default CardBanner