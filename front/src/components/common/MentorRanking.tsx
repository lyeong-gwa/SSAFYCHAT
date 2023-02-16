import "../../styles/components/common/mentor-ranking.css"
import RankingCard from "../../widget/RankingCard"

function MentorRanking(){
    return (
        <div className="ranking_box">
            <div className="ranking_container">
                <div className="ranking_header">금주 랭킹</div>
                <div className="ranking_main">
                    <span className="ranking_cell_a">
                        <RankingCard img= "/img/ranking1.jpg" info={{name:"김도원",com:"라인",job:"프론트",level:"10",menCnt:"11"}}></RankingCard>
                    </span>
                    <span className="ranking_cell_b">
                        <RankingCard img= "/img/ranking2.jpg" info={{name:"박정희",com:"넥슨",job:"백엔드",level:"9",menCnt:"10"}}></RankingCard>
                    </span>
                    <span className="ranking_cell_c">
                        <RankingCard img= "/img/ranking3.jpg" info={{name:"조원재",com:"당근마켓",job:"백엔드",level:"9",menCnt:"6"}}></RankingCard>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default MentorRanking