import "../../styles/components/user/sign_in_up.css";
import TextBox from "../../widget/InputTextBox";
import {Link} from 'react-router-dom';

function Join(){
    const footer_text = {
        key: process.env.REACT_APP_FOOTER,
    }
    return(
        <div className="login_join_container">
            <div className="login_join_logo_name draggable">Sign Up</div>
            <div>
                <div className="nomal_area">
                    <form className="login_text_box">
                        {/* 회원가입 입력 박스 */}
                        <TextBox item="id"></TextBox>
                        <TextBox item="pwd"></TextBox>
                        <TextBox item="ssafy_id"></TextBox>
                        <TextBox item="name"></TextBox>
                        <TextBox item="job"></TextBox>
                        <TextBox item="company"></TextBox>
                        {/* 회원가입 버튼 */}
                        <input className="submit_btn_upper draggable" type="submit" value="Sign Up" />
                        <hr className="hr_tag" />
                        <Link to="/user/login" className="link-tag-none"><button className="submit_btn_lower draggable" type="submit">Back</button></Link>
                    </form>
                        {/* 뒤로가기 버튼 */}
                    <div className="login_footer draggable">
                        <p className="footer_text">{footer_text.key}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Join;