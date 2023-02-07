import MentoringSearchForm from "../components/applying/MentoringSearchForm"
import MentoringSearchResult from "../components/applying/MentoringSearchResult"
import '../styles/container/applying-container.css'

function ApplyingContainer (){
    return (
        <div className="applying_container">
            <div className="applying_search">
                <MentoringSearchForm></MentoringSearchForm>
            </div>
            <div className="applying_result">
                <MentoringSearchResult></MentoringSearchResult>
            </div>
        </div>
    )
}

export default ApplyingContainer