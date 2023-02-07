import "../../styles/components/common/mentor-ranking.css"
import RankingCard from "../../widget/RankingCard"

function MentorRanking(){
    return (
        <div className="ranking_box">
            <div className="ranking_container">
                <div className="ranking_header">금주 랭킹</div>
                <div className="ranking_main">
                    <span className="ranking_cell_a">
                        <RankingCard></RankingCard>
                    </span>
                    <span className="ranking_cell_b">
                        <RankingCard></RankingCard>
                    </span>
                    <span className="ranking_cell_c">
                        <RankingCard></RankingCard>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default MentorRanking