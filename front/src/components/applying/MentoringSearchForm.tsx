import '../../styles/components/applying/mentoring-search-form.css'
import { useAppDispatch } from '../../hooks/hooks'
import { useState } from 'react'
import { searchMentoring } from '../../store/applyingSlice';

function MentoringSearchForm (){

    const [belong, setBelong] = useState("");    
    const [job, setJob] = useState("");
    const dispatch = useAppDispatch();

    function searchMentor(belong : string, job : string){
        let mentoring = {
            belong : belong,
            job : job,
        }
        dispatch(searchMentoring(mentoring));
    }
    
    return (
        <div>
            <form className='search_form' action="#">
                <div className="search">
                    <div className='search_image'>
                        <img src={require('../../assets/job_input.png')} alt="job" />
                    </div>
                        <input className='search_input' type="text" name='job' placeholder="직무" value={job} onChange={(e)=>{e.preventDefault();setJob(e.target.value);}}/>
                    <div className='search_icon'>
                        <div className='search_dropdown_icon'></div>
                    </div>
                </div>
                <div className="search">
                    <div className='search_image'>
                        <img src={require('../../assets/belong_input.png')} alt="belong" />
                    </div>
                    <input className='search_input' type="text" name='belong' placeholder="회사 이름 검색" value={belong} onChange={(e)=>{e.preventDefault();setBelong(e.target.value);}}/>
                    <div className='search_icon'>
                        <div className='search_button' onClick={()=>searchMentor(belong, job)}>
                            <img src={require('../../assets/search_icon.png')} alt="search_button"/>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default MentoringSearchForm