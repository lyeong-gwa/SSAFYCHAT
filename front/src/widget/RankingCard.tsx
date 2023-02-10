import "../styles/widget/ranking-card.css"

function RankingCard(){
    return (
        <div className="ranking_card">
            <div className="ranking_card_header">
                <div className="ranker_image"></div>
                <div className="ranker_detail">
                    <div className="ranker_name">
                        김겨울
                    </div>
                    <div className="ranker_job_detail">
                        <div className="ranker_belong">
                            SM Ent.
                        </div>
                        <div className="ranker_job">
                            백엔드 
                        </div>
                    </div>
                </div>
            </div>
            <div className="ranking_card_main">
                <div className="ranker_level">
                    <div className="ranker_text">레벨</div>
                    <div className="ranker_item">10</div>
                </div>
                <div className="ranker_mentorings">
                    <div className="ranker_text">멘토링</div>
                    <div className="ranker_item">45</div>
                </div>
            </div>
        </div>
    )
}

export default RankingCard