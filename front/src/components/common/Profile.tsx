import '../../styles/components/common/profile.css'
import { useAppSelector, useAppDispatch } from '../../hooks/hooks'
import { userinfo } from '../../api/user'
import { appendUserInfo } from '../../store/userSlice'

interface UserInfo{
    belong: string,
    social: string,
    studentNumber: string,
    job: string,
    totalScore: number,
}

function studentNumberSplit(num: string){
    const no = num.substring(0, 2);
    return no;
}

function Profile(){
    getUserInfo();
    const dispatch = useAppDispatch();
    const name = useAppSelector(state => state.user.name);
    const email = useAppSelector(state => state.user.email);
    const userInfo = useAppSelector(state => state.user.userInfo);
    const no = studentNumberSplit(userInfo.studentNumber);
    async function getUserInfo(){
        let userInfo: UserInfo = {
            belong: "",
            social: "",
            studentNumber: "",
            job: "",
            totalScore: 0,
        };
        await userinfo(
            (data: any) => {
                userInfo.belong = data.data.belong;
                userInfo.social = data.data.social;
                userInfo.studentNumber = data.data.studentNumber;
                userInfo.job = data.data.job;
                userInfo.totalScore = parseInt(data.data.totalScore);
                dispatch(appendUserInfo(userInfo));
            },
            (error: any) => {
                console.log(error);
            }
        )
    }
    return (
        <div className='profile_component'>
            <div className='profile_component_name'>{name}</div>
            <div className='profile_component_belong_job'>
                <span>{userInfo.job}</span>
                <span>{userInfo.belong}</span>
            </div>
            <div className='profile_component_total_score'>Lv. {userInfo.totalScore}</div>
            <div className='profile_component_student_id'>{no}</div>
            <div className='profile_component_email'>{email}</div>
            <div className='profile_component_edit'>수정</div>
        </div>
    )
}

export default Profile