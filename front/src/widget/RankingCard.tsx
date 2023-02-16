import "../styles/widget/ranking-card.css"

function RankingCard(props : any){

    return (
        <div className="ranking_card">
            <div className="ranking_card_header">
                <div ><img className="ranker_image" src={props.img}></img></div>
                <div className="ranker_detail">
                    <div className="ranker_name">
                        {props.info.name}
                    </div>
                    <div className="ranker_job_detail">
                        <div className="ranker_belong">
                            {props.info.com}
                        </div>
                        <div className="ranker_job">
                            {props.info.job} 
                        </div>
                    </div>
                </div>
            </div>
            <div className="ranking_card_main">
                <div className="ranker_level">
                    <div className="ranker_text">레벨</div>
                    <div className="ranker_item">{props.info.level}</div>
                </div>
                <div className="ranker_mentorings">
                    <div className="ranker_text">멘토링</div>
                    <div className="ranker_item">{props.info.menCnt}</div>
                </div>
            </div>
        </div>
    )
}

export default RankingCard