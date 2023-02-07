import '../../styles/components/common/profile.css'

function Profile(){
    return (
        <div className='profile_component'>
            <div className='profile_component_name'>김 태현</div>
            <div className='profile_component_belong_job'>
                <span>백앤드</span>
                <span>삼성전자</span>
            </div>
            <div className='profile_component_total_score'>Lv. 10</div>
            <div className='profile_component_student_id'>7전 8기</div>
            <div className='profile_component_email'>taehyeon08@naver.com</div>
            <div className='profile_component_edit'>수정</div>
        </div>
    )
}

export default Profile