import Calendar from '../components/common/Calendar'
import MentoringList from '../components/common/MentoringList'
import Profile from '../components/common/Profile'
import '../styles/container/mypage-container.css'

function MyPageContainer(){
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
                    <Calendar></Calendar>
                </div>
                <div className='my_schedule'>
                    <MentoringList></MentoringList>
                </div>
            </div>
        </div>
    )
}

export default MyPageContainer