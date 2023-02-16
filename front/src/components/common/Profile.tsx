import '../../styles/components/common/profile.css'
import { useAppSelector, useAppDispatch } from '../../hooks/hooks'

function whatMyNick(nick: string){
    switch (nick){
        case '01':
            return '1기';
        case '02':
            return '2기';
        case '03':
            return '3기';
        case '04':
            return '4기';
        case '05':
            return '5기로 극복';
        case '06':
            return '열정 핫식스';
        case '07':
            return '럭키세븐';
        case '08':
            return '7전8기';
        case '09':
            return '9뤠이트';
        case '10':
            return '10기';
    }
}
function changeLevel(score: number){
    return score/10;
}
function studentNumberSplit(num: string){
    const no = num.substring(0, 2);
    return whatMyNick(no);
}

function Profile(){
    const name = useAppSelector(state => state.user.name);
    const email = useAppSelector(state => state.user.email);
    const userInfo = useAppSelector(state => state.user.userInfo);
    const nick = studentNumberSplit(userInfo.studentNumber);
    return (
        <div className='profile_component'>
            <div className='profile_component_name'>{name}</div>
            <div className='profile_component_belong_job'>
                <span>{userInfo.job}</span>
                <span>{userInfo.belong}</span>
            </div>
            <div className='profile_component_total_score'>Lv. {changeLevel(userInfo.totalScore)}</div>
            <div className='profile_component_student_id'>{nick}</div>
            <div className='profile_component_email'>{email}</div>
            <div className='profile_component_edit'>수정</div>
        </div>
    )
}

export default Profile