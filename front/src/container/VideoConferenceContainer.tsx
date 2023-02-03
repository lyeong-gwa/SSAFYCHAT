import "../styles/container/video-conference-container.css"
import io from 'socket.io-client';
function test(){
const socket = io("ws://localhost:8000");

const myFace = document.getElementById("myFace") as HTMLMediaElement;
const muteBtn = document.getElementById("mute") as HTMLButtonElement;
const cameraBtn = document.getElementById("camera") as HTMLVideoElement;
const camerasSelect = document.getElementById("cameras") as HTMLSelectElement;
const call = document.getElementById("call") as HTMLDivElement;

if(call != null){
    call.hidden = true;
}
let myStream : any;
let muted = false;
let cameraOff = false;
let roomName : any ;
let myPeerConnection : any; //상호간의 연락을 위한
let myDataChannel : any; //데이터채널 1:1 
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

const welcome = document.getElementById("welcome") as HTMLDivElement;
const welcomeForm = welcome?.querySelector("form") as HTMLFormElement;

async function initCall() { //startMedia() -> initCall
    welcome.hidden = true;
    call.hidden = false;
    await getMedia(null);//이제 여기서 미디어를 시작한다.
    makeConnection();
}

async function handleWelcomeSubmit(event : any) {
    event.preventDefault();
    const input = welcomeForm.querySelector("input") as HTMLInputElement;
    //socket.emit("join_room", input.value, startMedia); //answer실습위치에서 done삭제하였음
    await initCall();
    socket.emit("join_room", input.value);
    roomName = input.value;
    input.value = "";
}

welcomeForm?.addEventListener("submit", handleWelcomeSubmit);

// Socket Code

socket.on("welcome", async () => {
    //데이터채널 생성 최초생성자
    myDataChannel = myPeerConnection.createDataChannel("chat");
    myDataChannel.addEventListener("message", (event : any) => console.log(event.data));
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
        myDataChannel.addEventListener("message", (event : any) =>
            console.log(event.data)
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
    console.log("peer가 보낸 이벤트(스트림)-> 이걸로 나랑 연락할 수 있어", data);
    const peerFace = document.getElementById("peerFace") as HTMLVideoElement;
    if(peerFace != null){
        peerFace.srcObject = data.stream;
    }
}
}

function VideoConferenceContainer(props : any){
    let first = true;
    return(
        // 회의 컨테이너 전체를 담는 컨테이너
        <div id="call" className="video_conference_container" onMouseEnter={()=>{
            if(first){
                first = false;
                test();
            }
        }}>

            {/* webRtc용 임시 입력창 */}
            <div className="vcTmp" id="welcome">
                <form>
                    <input placeholder="roomCode"></input><br></br>
                    <button>입력</button>
                </form>
                    {/* <button id="mute">Mute</button>
                    <button id="camera">Turn Camera Off</button>
                    <select id="cameras"></select> */}
            </div>
            {/* <div id="call"> */}
                {/* <div id="myStream">
                    <video id="myFace" height="400" width="400" autoPlay playsInline></video> */}
                    {/* <video id="peerFace" height="400" width="400" autoPlay playsInline></video> */}
                {/* </div> */}
            {/* </div> */}

            {/* 비디오 화면과 버튼들을 담을 왼쪽 컨테이너 */}
            <div className="video_conference_left" id="myStream">

                {/* 내 비디오 화면을 담을 컨테이너 */}
                <div className="video_conference_mine">
                    {/* 내 비디오 화면 */}
                    <video className="video_conference_mine_screen" id="myFace"  autoPlay playsInline>

                    </video>
                </div>

                {/* 상대의 비디오 화면을 담을 컨테이너 */}
                <div className="video_conference_oppnent">
                    {/* 상대의 비디오 화면 */}
                    <video id="feerFace" className="video_conference_oppnent_screen" autoPlay playsInline>

                    </video>
                </div>

                {/* 각종 버튼을 담는 컨테이너 */}
                <div className="video_conference_footer">
                    <div className="video_conference_button_container">
                        <div  id="camera" className="video_conference_button">
                            <img src="img/camera-on.png" alt="camera"></img>
                            <span className="buttonText">비디오 중지</span>
                            <img src="img/arrow-down.png" alt="arrow-donwn"></img>
                        </div>
                        <div id="mute" className="video_conference_button">
                            <img src="img/audio-microphone-on.png" alt="mic"></img>
                            <span className="buttonText">음소거</span>
                            <img src="img/arrow-down.png" alt="arrow-donwn"></img>
                        </div>
                        <select id="cameras"></select>
                        {/* 화면 공유는 구현이 쉽지 않을 것으로 보인다 */}
                        {/* <div className="video_conference_button">
                            <img src="img/share-screen.png" alt="recording"></img>
                            <span></span>
                        </div> */}
                        <div className="video_conference_cancel">
                            <img src="img/cancel.png" alt="recording"></img>
                        </div>
                    </div>
                </div>
            </div>

            {/* 채팅창을 담을 오른쪽 컨테이너 */}
            <div className="video_conference_right">
               
                {/* 채팅 내용을 보여줄 리스트 요소 */}
                <ul className="video_conference_chat_content_ul">
                    <li className="video_conference_chat_content_li">

                    </li> 
                </ul>

                {/*  */}
                <div className="video_conference_chat_container">
                    {/* 채팅 입력 input */}
                    <input className="video_conference_chat_input">

                    </input>
                </div>
            </div>
            <script>

                
            </script>
        </div>
    )
}

export default VideoConferenceContainer;