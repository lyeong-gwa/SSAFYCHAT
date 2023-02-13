import MyPageCalendar from '../components/common/MypageCalendar'
import MentoringList from '../components/common/MentoringList'
import Profile from '../components/common/Profile'
import '../styles/container/mypage-container.css'
import { useAppDispatch } from "../hooks/hooks"
import { changeBanner } from "../store/userSlice"

import { mentoringinfos } from '../api/user'

function MyPageContainer(){
    const dispatch = useAppDispatch();
    dispatch(changeBanner("마이페이지"));

    async function test() {
        await mentoringinfos(
            (data: any) => {
                console.log(data.data);
            },
            (error: any) => {
                console.log(error);
            }
        )
    }
    test();
    return (
        <div className="mypage_container">
            <div className='profile'>
                <div className='my_image'>
                    <img className='image' src={require('../assets/smith.png')} alt="profile"></img>
                </div>
                <div className='my_info'>
                    <Profile></Profile>
                </div>
            </div>
            <div className='schedule'>
                <div className='my_calendar'>
                    <MyPageCalendar></MyPageCalendar>
                </div>
                <div className='my_schedule'>
                    <MentoringList></MentoringList>
                </div>
            </div>
        </div>
    )
}

export default MyPageContainer