import "../../styles/components/user/sign_in_up.css";
import TextBox from "../../widget/InputTextBox";
import {Link} from 'react-router-dom';
import {useState} from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks'
import { signIn } from "../../store/userSlice";

function emailRegexr(data: string){
    const regexr = /^[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    return data.match(regexr);
}


function Login(props: any){
    const dispatch = useAppDispatch();
    const IS_LOG_IN = useAppSelector(state => state.user.isLogin);
    console.log(IS_LOG_IN)
    interface UserState{
        email: string,
        password: string,
        isLogin: boolean,
        userInfo: any,
    }

    async function signInBtn(){
        if(userId!=='' && check_email && userPwd!==''){
            
            const userInfo : UserState = {
                email: userId,
                password: userPwd,
                isLogin: true,
                userInfo: null,
            }
            await dispatch(signIn(userInfo));
            // await login(
            //     userInfo,
            //     (data: any) => {
            //         console.log(data);
            //         if(data.status === 200){
            //             const accessToken = data.data["accessToken"];
            //             const refreshToken = data.data["refreshToken"];
            //             sessionStorage.setItem("access-token", accessToken);
            //             sessionStorage.setItem("refresh-token", refreshToken);
            //             console.log("ISLOGIN", IS_LOG_IN);
            //             setIsLogIn(true);
            //             console.log("ISLOGIN", IS_LOG_IN);
            //         }
            //     },
            //     (error: any) => {
            //         console.log(error);
            //     }
            // )
        }
    }
    const imgUrlGithub = "/img/Github.png"
    const imgUrlGoogle = "/img/Google.png"
    const imgUrlkakao = "/img/kakao.png"
    const footer_text = {
        key: process.env.REACT_APP_FOOTER,
    }

    // 로그인, 로그아웃 여부 확인
    // const [IS_LOG_IN, setIsLogIn] = useState(false);

    let check_email: boolean = true;

    const [userId, setUserId] = useState('');
    const [userPwd, setUserPwd] = useState('');

    const handleStateId = (data: any) => {
        setUserId(data.target.value);
    }
    const handleStatePwd = (data: any) => {
        setUserPwd(data.target.value);
    }

    if(!emailRegexr(userId)){
        check_email = false;
    }else{
        check_email = true;
    }

    return(
        <div className="login_join_container">
            <div className="login_join_logo_name draggable">SSAFY CHAT</div>
            <div>
                <div className="nomal_area">
                    <form className="login_text_box">
                        {/* 로그인 입력 박스 두개 */}
                        <TextBox item="id" sItem={handleStateId}></TextBox>
                        {!check_email && userId !== '' ? <span className="checkEmail">이메일 형식이 맞지 않습니다.</span> : null}
                        <TextBox item="pwd" sItem={handleStatePwd}></TextBox>
                        {/* 아이디 기억 */}
                        <div className="b_side">
                            <div className="save_id draggable">
                                <input type="checkbox" className="save_id_input" name="save_id" id="save_id" />
                                Remember Me
                            </div>
                            {/* 아이디 비밀번호 찾기 */}
                            <a className="find_pwd draggable" href="#!">Forgot ID or Password?</a>
                        </div>
                        {/* 로그인 버튼 */}
                        <div>ss{IS_LOG_IN}</div> 
                        <Link to={IS_LOG_IN?"/":"/user/login"} className="link-tag-none"><button className="submit_btn_upper draggable" type="submit" onClick={signInBtn}>Sign In</button></Link>
                        {/* <input className="submit_btn_upper draggable" type="submit" value="Sign In" /> */}
                        <hr className="hr_tag" />
                        {/* 회원가입 버튼 */}
                        <Link to="/user/join" className="link-tag-none"><button className="submit_btn_lower draggable" type="submit">Sing Up</button></Link>
                    </form>
                </div>
            </div>
            <div className="sns_login_contain draggable">
                <div className="github sns_login">
                    <img src={imgUrlGithub} alt="Github" />
                </div>
                <div className="kakao sns_login">
                    <img src={imgUrlkakao} alt="kakao" />
                </div>
                <div className="google sns_login">
                    <img src={imgUrlGoogle} alt="Google" />
                </div>
                <div className="login_footer">
                    <p className="footer_text draggable">{footer_text.key}</p>
                </div>
            </div>
        </div>
    )
}

export default Login;