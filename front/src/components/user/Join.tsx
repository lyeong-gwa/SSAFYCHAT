import "../../styles/components/user/sign_in_up.css";
import TextBox from "../../widget/InputTextBox";
import {Link, useNavigate} from 'react-router-dom';
import { useState } from "react";
import { join } from "../../api/user";
import { useAppSelector } from "../../hooks/hooks";

interface JoinUser{
    email : string;
    password : string;
    studentNumber : string;
    name : string;
    job : string;
    belong : string;
}

//이메일 유효성 검증
function emailRegexr(data: string){
    const regexr = /^[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    return data.match(regexr);
}

//학번 유효성 검증
function studentNumberRegexr(data: string){
    const regexr = /^[0-9]{7}$/;
    return data.match(regexr);
}

function Join(){
    const navigate = useNavigate();

    async function joinApi(){
        if(userEmail!=='' && check_email && userPassword!==''&&
            studentNumber!=='' && check_studentNumber &&
            userName!==''){
            const userInfo = {
                email: userEmail,
                password: userPassword,
                name : userName,
                student_number : studentNumber,
                job : userJob,
                belong : userBelong
            }

            await join(
                userInfo,
                (data: any) => {
                    console.log(data);
                    // navigate("/user/login");
                },
                (error: any) => {
                    console.log(error);
                }
            )
        }
    }


    let check_email: boolean = true;
    let check_studentNumber : boolean = true;
    
    const [userEmail, setEmail] = useState('');
    const [userPassword, setPassword] = useState('');
    const [studentNumber, setStudentNumber] = useState('');
    const [userName, setUserName] = useState('');
    const [userJob, setUserJob] = useState('');
    const [userBelong, setUserBelong] = useState('');


    const handleStateId = (data: any) => {
        console.log(data.target.value);
        setEmail(data.target.value);
    }
    const handleStatePassword = (data: any) => {
        console.log(data.target.value);
        setPassword(data.target.value);
    }
    const handleStateBelong = (data: any) => {
        if(userBelong===''){
            console.log(data.target.value);
            setUserBelong("SSAFY");
        }else{
            console.log(data.target.value);
            setUserBelong(data.target.value);
        }      
    }
    const handleStateStudentNumber = (data: any) => {
        console.log(data.target.value);
        setStudentNumber(data.target.value);
    }
    const handleStateName = (data: any) => {
        console.log(data.target.value);
        setUserName(data.target.value);
    }
    const handleStateUserJob = (data: any) => {
        console.log(data.target.value);
        setUserJob(data.target.value);
    }

    if(!emailRegexr(userEmail)){
        check_email = false;
    }else{
        check_email = true;
    }
    if(!studentNumberRegexr(studentNumber)){
        check_studentNumber = false;
    }else{
        check_studentNumber = true;
    }

    

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
                        <TextBox item="id" sItem={handleStateId}></TextBox>
                        {!check_email && userEmail !== '' ? <span className="checkEmail">이메일 형식이 맞지 않습니다.</span> : null}
                        <TextBox item="pwd" sItem={handleStatePassword}></TextBox>
                        <TextBox item="ssafy_id" sItem={handleStateStudentNumber}></TextBox>
                        {!check_studentNumber && studentNumber !== '' ? <span className="checkEmail">학번 형식이 맞지 않습니다.</span> : null}
                        <TextBox item="name" sItem={handleStateName}></TextBox>
                        <TextBox item="job" sItem={handleStateUserJob}></TextBox>
                        <TextBox item="company" sItem={handleStateBelong}></TextBox>
                        {/* 회원가입 버튼 */}
                        <Link to={useAppSelector(state => state.user.isLogin)?"/":"/user/login"} className="link-tag-none"><button className="submit_btn_upper draggable" type="submit" onClick={joinApi}>Sign Up</button></Link>
                        <hr className="hr_tag" />
                        <Link to="/user/login" className="link-tag-none"><button className="submit_btn_lower draggable" type="submit" >Back</button></Link>
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
