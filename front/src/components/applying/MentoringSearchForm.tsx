import '../../styles/components/applying/mentoring-search-form.css'
function MentoringSearchForm (){
    return (
        <div>
            <form className='search_form' action="#">
                <div className="search">
                    <div className='search_image'>
                        <img src={require('../../assets/job_input.png')} alt="job" />
                    </div>
                        <input className='search_input' type="text" name='job' placeholder="직무" />
                    <div className='search_icon'>
                        <div className='search_dropdown_icon'></div>
                    </div>
                </div>
                <div className="search">
                    <div className='search_image'>
                        <img src={require('../../assets/belong_input.png')} alt="belong" />
                    </div>
                    <input className='search_input' type="text" name='belong' placeholder="회사 이름 검색"/>
                    <div className='search_icon'>
                        <div className='search_button'>
                            <img src={require('../../assets/search_icon.png')} alt="search_button"/>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default MentoringSearchForm