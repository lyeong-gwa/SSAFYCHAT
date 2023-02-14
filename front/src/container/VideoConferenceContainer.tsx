import "../styles/container/video-conference-container.css"
import io from 'socket.io-client';
import { useNavigate } from "react-router";
import { useAppSelector } from "../hooks/hooks";
import {chatMessage, chatLog} from "../api/chatting"
import MentoringChat from "../widget/MentoringChat";
import { useState } from "react";
import { useEffect } from "react";
import { completeMentoring } from "../api/mentoring";
import ReviewModal from "../components/modal/ReviewModal";

function exit(navigate : any){
    navigate("/banner/mentoring");
}

function VideoConferenceContainer(props : any){

    const imgUrlEmoji = "/img/emoji.png";
    const imgUrlSend = "/img/send.png";
    let userinfo : any = undefined;
    userinfo = useAppSelector(state => state.user);
    let mentoringId : any = -1;
    mentoringId = useAppSelector(state=>state.mentoring.mentoringId);
    let tmplog : { chat_id: number; user_id: number; message: string; Date: number; }[] = []; 
    const[clickCancel, setClickCancel] = useState(false);
    const [logmsg,setLogmsg] = useState<{ chat_id: number; user_id: number; message: string; Date: number; }[]>([]);
    const navigate = useNavigate();
    let first = true;
    useEffect(()=>{
        if( userinfo !== undefined && mentoringId !== -1 && first){
            console.log(12345 + " 나는 처음이야");
            first = false;
            init(userinfo,mentoringId);
        }
    },[mentoringId,userinfo]);
    return(
        // 회의 컨테이너 전체를 담는 컨테이너

        
        <div id="call" className="video_conference_container">


             {/* <div id="call"> 
                 <div id="myStream">
                    <video id="myFace" height="400" width="400" autoPlay playsInline></video>
                     <video id="peerFace" height="400" width="400" autoPlay playsInline></video> 
                 </div> 
             </div>  */}

            {/* 비디오 화면과 버튼들을 담을 왼쪽 컨테이너 */}
            <div id="myStream" className="video_conference_left" >

                {/* 내 비디오 화면을 담을 컨테이너 */}
                <div className="video_conference_mine">
                    {/* 내 비디오 화면 */}
                    <video  id="myFace" className="video_conference_mine_screen"  autoPlay playsInline>

                    </video>
                </div>

                {/* 상대의 비디오 화면을 담을 컨테이너 */}
                <div className="video_conference_oppnent">
                    {/* 상대의 비디오 화면 */}
                    <video id="peerFace" className="video_conference_oppnent_screen" autoPlay playsInline>

                    </video>
                </div>

                {/* 각종 버튼을 담는 컨테이너 */}
                <div className="video_conference_footer">
                    <div className="video_conference_button_container">
                        <div  id="camera" className="video_conference_button">
                            <img src="/img/camera-on.png" alt="camera"></img>
                            <span className="buttonText">비디오 중지</span>
                            <img src="/img/arrow-down.png" alt="arrow-donwn"></img>
                        </div>
                        <div id="mute" className="video_conference_button">
                            <img src="/img/audio-microphone-on.png" alt="mic"></img>
                            <span className="buttonText">음소거</span>
                            <img src="/img/arrow-down.png" alt="arrow-donwn"></img>
                        </div>
                        <select id="cameras"></select>
                        
                        <div className="video_conference_cancel" onClick={()=>{
                            completeMentoring(mentoringId,(success:any)=>{
                                console.log(success);
                            },(fail:any)=>{
                                console.log(fail);
                                alert("다시시도해주세요");
                            })
                        }}>
                            <img src="/img/cancel.png" alt="recording"></img>
                        </div>
                    </div>
                </div>
            </div>

            {/* 채팅창을 담을 오른쪽 컨테이너 */}
            <div className="video_conference_right">
                {/* 채팅 내용을 보여줄 리스트 요소 */}
                <div className="video_conference_chat_content_message">
                    <MentoringChat tmplog={logmsg}></MentoringChat>
                </div>
                       
                <div className="video_conference_chat_container">
                    {/* 채팅 입력 input */}
                    
                    <div className="input_bar">
                        <div className="emoji_div">
                            <img src={imgUrlEmoji} alt="" className="emoji" />
                        </div>
                        
                        <input type="text" name="msg" id="video_conference_chat_input" className="input_msg" />
                        
                        <div className="send_div">
                            <img src={imgUrlSend} alt="" className="send" />
                        </div>
                    </div>
                </div>
            </div>
            {clickCancel && (
                <ReviewModal closeModal={()=> {
                    setClickCancel(!clickCancel);
                    exit(navigate); 
                }}></ReviewModal>
            )}  
        </div>
    )

    function init(userinfo:any, mentoringId : number){

        const mentoringid= mentoringId;
        const userid = userinfo;
        const socket = io(process.env.REACT_APP_SOCKET as string,{path: "/socket.io",transports:["websocket"]});
        const myFace = document.getElementById("myFace") as HTMLMediaElement;
        const muteBtn = document.getElementById("mute") as HTMLButtonElement;
        const cameraBtn = document.getElementById("camera") as HTMLVideoElement;
        const camerasSelect = document.getElementById("cameras") as HTMLSelectElement;
        const call = document.getElementById("call") as HTMLDivElement;
        const chattinginput = document.getElementById("video_conference_chat_input") as HTMLInputElement;
        let myDataChannel : any; //데이터채널 1:1 
        chatLog(mentoringid,(chatlog:any)=>{
            tmplog = chatlog.data.log;
            setLogmsg(JSON.parse(JSON.stringify(tmplog)));
            },(err:any)=>{
                console.log(err);
            }
        );
        let inputListen = function (event : any) {
            if (event.keyCode === 13 && chattinginput.value != "") {
                const senddata = {"chat_id": mentoringid,"user_id":userid,"message":chattinginput.value,"Date": Date.now()};
                
                chattinginput.value = "";
                //몽고DB에 senddata + chat_id를 추가해서 전달
                
                chatMessage(
                    senddata,
                    (data:any)=>{
                        myDataChannel.send(JSON.stringify(senddata));
                        tmplog.push(senddata);
                        setLogmsg(JSON.parse(JSON.stringify(tmplog)));

                    },
                    (err:any)=>{console.log(err);}
                  );
                  const msgdiv = document.getElementById("messages") as HTMLDivElement;
                  console.log("msgdiv",msgdiv);
                  msgdiv.scrollTop = 0;
            }
            
        }

        chattinginput.removeEventListener("keyup",inputListen);
        chattinginput.addEventListener("keyup",inputListen);
        
        if(call != null){
            call.hidden = true;
        }
        let myStream : any;
        let muted = false;
        let cameraOff = false;
        let roomName : any ;
        let myPeerConnection : any; //상호간의 연락을 위한
        
        async function getCameras() {
            try {
                const devices = await navigator.mediaDevices.enumerateDevices();//사용자의 미디어 디바이스 목록 가져온다.
                const cameras = devices.filter((device) => device.kind === "videoinput");
                const currentCamera = myStream.getVideoTracks()[0];
                cameras.forEach((camera) => {
                    const option = document.createElement("option");
                    option.value = camera.deviceId;
                    option.innerText = camera.label;
                    if (currentCamera.label === camera.label) {//카메라 디바이스 중에서 선택한 값에 해당하는 디바이스를 활성화
                        option.selected = true;
                    }
                    camerasSelect?.appendChild(option);
                });
            } catch (e) {
                console.log(e);
            }
        }
        
        async function getMedia(deviceId : any) {
            const initialConstrains = { //전면카메라
                audio: true,
                video: { facingMode: "user" },
            };
            const cameraConstraints = {//후면카메라
                audio: true,
                video: { deviceId: { exact: deviceId } },
            };
            try {
                // 카메라 예제에서 사용
                // myStream = await navigator.mediaDevices.getUserMedia({
                //     audio: true,
                //     video: true,
                // });
        
                //
        
                myStream = await navigator.mediaDevices.getUserMedia(
                    deviceId ? cameraConstraints : initialConstrains
                );
                myFace.srcObject = myStream;
                if (!deviceId) {
                    await getCameras();
                }
            } catch (e) {
                console.log(e);
            }
        }
        function handleMuteClick() {
            myStream
                .getAudioTracks()
                .forEach((track : any) => (track.enabled = !track.enabled));
            
            if (!muted) {
                const childs = muteBtn.children;
                childs[1].innerHTML = "음소거 해제"
                muted = true;
            } else {
                const childs = muteBtn.children;
                childs[1].innerHTML = "음소거"
                muted = false;
            } 
            
        }
        function handleCameraClick() {
            myStream
                .getVideoTracks()
                .forEach((track : any) => (track.enabled = !track.enabled));
            
            if(cameraBtn != null){
                if (cameraOff) {
                    const childs = cameraBtn.children;
                    childs[1].innerHTML = "비디오 중지"
                    cameraOff = false;
                } else {
                    const childs = cameraBtn.children;
                    childs[1].innerHTML = "비디오 시작"
                    cameraOff = true;
                }
            }
        }
        
        async function handleCameraChange() {
            await getMedia(camerasSelect.value);
            if (myPeerConnection) { //peer통신가능하다면
                const videoTrack = myStream.getVideoTracks()[0]; //선택한 비디오 트랙
                const videoSender = myPeerConnection  //비디오 변경되면 스트림 새로 생성후 대체해야 한다.
                    .getSenders()
                    .find((sender : any) => sender.track.kind === "video");
                videoSender.replaceTrack(videoTrack);
            }
        }
        //getMedia(); 이제 ui에서 불러오므로 생략
        muteBtn.addEventListener("click", handleMuteClick);
        cameraBtn.addEventListener("click", handleCameraClick);
        camerasSelect.addEventListener("input", handleCameraChange);
        
        //-아래코드는 방과 관련한 코드--------------------------------------------
        
        async function initCall() { //startMedia() -> initCall
            call.hidden = false;
            await getMedia(null);//이제 여기서 미디어를 시작한다.
            makeConnection();
        }
        
        async function handleWelcomeSubmit() {
            // event.preventDefault();
            // const input = welcomeForm.querySelector("input") as HTMLInputElement;
            //socket.emit("join_room", input.value, startMedia); //answer실습위치에서 done삭제하였음
            await initCall();
            socket.emit("join_room", mentoringId);
            roomName = mentoringId;
        }
        
        // Socket Code
        
        socket.on("welcome", async () => {
            //데이터채널 생성 최초생성자
            myDataChannel = myPeerConnection.createDataChannel("chat");
            myDataChannel.addEventListener("message", (event : any) =>{
                    tmplog.push(JSON.parse(event.data));
                    setLogmsg(JSON.parse(JSON.stringify(tmplog)));
                }
            );
            console.log("made data channel");
        
            const offer = await myPeerConnection.createOffer();
            myPeerConnection.setLocalDescription(offer);
            console.log("sent the offer");
            socket.emit("offer", offer, roomName);
        });
        
        socket.on("offer", async (offer) => {
            //데이터채널 두번째 들어온사람
            myPeerConnection.addEventListener("datachannel", (event : any) => {
                myDataChannel = event.channel;
                myDataChannel.addEventListener("message", (event : any) =>{
                        tmplog.push(JSON.parse(event.data));
                        setLogmsg(JSON.parse(JSON.stringify(tmplog)));
                    }
                );
            });
        
        
            console.log("received the offer");
            myPeerConnection.setRemoteDescription(offer);
            const answer = await myPeerConnection.createAnswer();
            myPeerConnection.setLocalDescription(answer);
            socket.emit("answer", answer, roomName);
            console.log("sent the answer");
        });
        
        socket.on("answer", (answer) => {
            console.log("received the answer");
            myPeerConnection.setRemoteDescription(answer);
        });
        
        socket.on("ice", (ice) => {
            console.log("received candidate");
            myPeerConnection.addIceCandidate(ice);
        });
        
        // RTC Code
        
        function makeConnection() {
            myPeerConnection = new RTCPeerConnection(); // {stun}서버 등록해야 같은 공용네트워크 이외의 다른 네트워크간의 통신가능
            myPeerConnection.addEventListener("icecandidate", handleIce);
            myPeerConnection.addEventListener("addstream", handleAddStream);
            myStream
                .getTracks()
                .forEach((track : any) => myPeerConnection.addTrack(track, myStream));
        }
        
        function handleIce(data : any) {
            console.log("sent candidate");
            socket.emit("ice", data.candidate, roomName);
        }
        
        function handleAddStream(data : any) {
            console.log("stream : ", data);
            const peerFace = document.getElementById("peerFace") as HTMLVideoElement;
            if(peerFace != null){
                peerFace.srcObject = data.stream;
            }
        }
        handleWelcomeSubmit();
        }
}

export default VideoConferenceContainer;
