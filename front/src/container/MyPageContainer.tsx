import MyPageCalendar from '../components/common/MypageCalendar'
import MentoringList from '../components/common/MentoringList'
import Profile from '../components/common/Profile'
import '../styles/container/mypage-container.css'
import { useAppDispatch } from "../hooks/hooks"
import { changeBanner } from "../store/userSlice"
import { mentoringinfos } from '../api/user'
import { appendUserInfo } from '../store/userSlice'
import { useState } from "react";
import { useEffect } from "react";

interface UserInfo{
    belong: string,
    studentNumber: string,
    job: string,
    totalScore: number,
}



function MyPageContainer(){
    const dispatch = useAppDispatch();
    dispatch(changeBanner("마이페이지"));
    //const [pagedata,setPagedata] = useState<{ member: Object; matchMentorings: Array<Object>; completeMentorings: Array<Object>; }[]>({member: Object,matchMentorings: Array<Object>,completeMentorings: Array<Object>,});
    async function init() {
        let userInfo: UserInfo = {
            belong: "",
            studentNumber: "",
            job: "",
            totalScore: 0,
        };

        await mentoringinfos(
            (data: any) => {
                console.log(data.data.matchMentorings);
                console.log(data.data.completeMentorings);
                //setPagedata(data.data);
                userInfo.belong = data.data.member.belong;
                userInfo.studentNumber = "0404444";//data.data.member.studentNumber;
                userInfo.job = data.data.member.job;
                userInfo.totalScore = 10//parseInt(data.data.member.totalScore);
                //dispatch(appendUserInfo(userInfo));
            },
            (error: any) => {
                console.log(error);
            }
        )
    }
    useEffect(()=>{
        init();
    },[]);
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
                    {/* 여기 수정 6 */}
                    {/* <MentoringList matchMentorings={pagedata.matchMentorings} completeMentorings={pagedata.completeMentorings}></MentoringList> */}
                </div>
            </div>
        </div>
    )
}

export default MyPageContainer