import "../styles/components/header.css"
import { Link } from "react-router-dom"
import { useAppSelector, useAppDispatch } from '../hooks/hooks'
import { signOut } from "../store/userSlice"

function Header (){
  const dispatch = useAppDispatch();

  interface UserState{
    email: string,
    password: string,
    isLogin: boolean,
    userInfo: any,
  }

  function logout(){
    const userInfo : UserState = {
      email : "",
      password: "",
      isLogin: false,
      userInfo: null,
    }
    dispatch(signOut(userInfo));
  }
  
    return (
        <div className="header">
            <div className="header_name">SSAFY CHAT</div>
            <nav className="navbar">
              <div className="home">
                <Link to="/">Home</Link>
              </div>
              <div className="mentoring">
                <div className="dropdown">
                  <span className="dropbtn"> 
                    <span>Mentoring</span>
                  </span>
                  <div className="dropdown_content">
                    <Link to="/banner/apply">멘토링 신청</Link>
                    <Link to="/banner/mentoring">예약 확인</Link>
                    <Link to="/banner/confirm">예약 수락</Link>
                    <Link to="/banner/roll">롤링페이퍼</Link>
                  </div>
                </div>
              </div>
              <div className="user">
                <div className="dropdown">
                  <span className="dropbtn"> 
                  <span>
                    <div className="dropbtn_image"></div>
                  </span>
                  <span>김겨울 님</span>
                  <span>
                    <div className="dropbtn_icon"></div>
                    </span>
                  </span>
                  <div className="dropdown_content">
                    <Link to="/" onClick={logout}>로그아웃</Link>
                    <Link to="/banner/mypage">마이페이지</Link>
                  </div>
                </div>
              </div>
            </nav>
        </div>
    )
}

export default Header