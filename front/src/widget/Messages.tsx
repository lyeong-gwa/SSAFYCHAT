import "../styles/widget/messages.css"

function Messages(props: any){
    const imgUrlEmoji = "/img/emoji.png";
    const imgUrlSend = "/img/send.png";
    return(
        <div className="content">
            <div className="top_bar">
                <div className="other_user">
                    <div className="avatar_"></div>
                    <div className="name_contain">
                        <div className="name">
                            {/* <span className="user_name">{props.user_name}</span> */}
                            <span className="user_name">김겨울</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="messages">
                <div className="date1">
                    <div className="date2">
                        {/* <span>{props.date}</span> */}
                        <span>23.01.31</span>
                    </div>
                </div>
                <div className="other_msg">
                    <div className="o_message">
                        <span>도움이 되었길 바랍니다.</span>
                        <div className="o_time">
                            <span>18:10</span>
                        </div>
                    </div>
                </div>
                <div className="my_msg">
                    <div className="my_message">
                        <span>감사합니다.</span>
                        <div className="my_time">
                            <span>18:30</span>
                        </div>
                    </div>
                </div>
                <div className="input_bar">
                    <div className="emoji_div">
                        <img src={imgUrlEmoji} alt="" className="emoji" />
                    </div>
                    <input type="text" name="msg" id="msg" className="input_msg" />
                    <div className="send_div">
                        <img src={imgUrlSend} alt="" className="send" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Messages;