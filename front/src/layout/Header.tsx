import "../styles/components/header.css"
import { Link, useNavigate } from "react-router-dom"
import { useAppSelector, useAppDispatch } from '../hooks/hooks'
import { changeIsLogin, appendEmail, appendName, appendUserId, appendRole } from "../store/userSlice"
import { logout } from "../api/user"

function Header (){
  const dispatch = useAppDispatch();
  const email = useAppSelector(state => state.user.email);
  const role = useAppSelector(state => state.user.role);
  const name = useAppSelector(state => state.user.name);
  const navigate = useNavigate();

  async function logoutApi(){
    await logout(
      email,
      (data: any) => {
        if(data.status === 200){
          console.log(sessionStorage.getItem('access-token'));
          sessionStorage.removeItem('access-token');
          sessionStorage.removeItem('refresh-token');

          dispatch(changeIsLogin(false));
          dispatch(appendEmail(""));
          dispatch(appendName(""));
          dispatch(appendUserId(""));
          dispatch(appendRole(""));
          navigate("/user/login");
        }
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

  return (
      <div className="header">
          <Link to="/"><div className="header_name">SSAFY CHAT</div></Link>
          <nav className="navbar">
            {/* <div className="home">
              <Link to="/">Home</Link>
            </div> */}
            <div className="mentoring">
              <div className="dropdown">
                <span className="dropbtn"> 
                  <span>Mentoring</span>
                </span>
                <div className="dropdown_content">
                  {role === 'role_mentee' ? <Link to="/banner/apply">멘토링 신청</Link> : null}
                  {role === 'role_mentee' ? <Link to="/banner/mentoring">예약 확인</Link> : null}
                  {role === 'role_mentor' ? <Link to="/banner/confirm">예약 수락</Link> : null}
                  {role === 'role_mentor' ? <Link to="/banner/roll">롤링페이퍼</Link> : null}
                </div>
              </div>
            </div>
            <div className="user">
              <div className="dropdown">
                <span className="dropbtn"> 
                <span>
                  <div className="dropbtn_image"></div>
                </span>
                <span>{name} 님</span>
                <span>
                  <div className="dropbtn_icon"></div>
                  </span>
                </span>
                <div className="dropdown_content">
                  <Link to="/" onClick={logoutApi}>로그아웃</Link>
                  <Link to="/banner/mypage">마이페이지</Link>
                </div>
              </div>
            </div>
          </nav>
      </div>
  )
}

export default Header