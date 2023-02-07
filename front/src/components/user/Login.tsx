import "../../styles/components/user/sign_in_up.css";
import TextBox from "../../widget/InputTextBox";
import {Link} from 'react-router-dom';

function Login(props: any){
    const imgUrlGithub = "/img/Github.png"
    const imgUrlGoogle = "/img/Google.png"
    const imgUrlkakao = "/img/kakao.png"
    const footer_text = {
        key: process.env.REACT_APP_FOOTER,
    }
    return(
        <div className="login_join_container">
            <div className="login_join_logo_name draggable">SSAFY CHAT</div>
            <div>
                <div className="nomal_area">
                    <form className="login_text_box">
                        {/* 로그인 입력 박스 두개 */}
                        <TextBox item="id"></TextBox>
                        <TextBox item="pwd"></TextBox>
                        {/* 아이디 기억 */}
                        <div className="b_side">
                            <div className="save_id draggable">
                                <input type="checkbox" name="save_id" id="save_id" />
                                Remember Me
                            </div>
                            {/* 아이디 비밀번호 찾기 */}
                            <a className="find_pwd draggable" href="#!">Forgot ID or Password?</a>
                        </div>
                        {/* 로그인 버튼 */}
                        <Link to="/"><input className="submit_btn_upper draggable" type="submit" value="Sign In" /></Link>
                        {/* <input className="submit_btn_upper draggable" type="submit" value="Sign In" /> */}
                        <hr className="hr_tag" />
                        {/* 회원가입 버튼 */}
                        <Link to="/user/join"><button className="submit_btn_lower draggable" type="submit">Sing Up</button></Link>
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