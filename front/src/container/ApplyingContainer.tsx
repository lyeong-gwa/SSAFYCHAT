import MentoringSearchForm from "../components/applying/MentoringSearchForm"
import MentoringSearchResult from "../components/applying/MentoringSearchResult"
import { useAppDispatch } from "../hooks/hooks"
import { changeBanner } from "../store/userSlice"
import '../styles/container/applying-container.css'

function ApplyingContainer (){
    const dispatch = useAppDispatch();
    dispatch(changeBanner("멘토링 신청"));
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