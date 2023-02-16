import "../styles/widget/Chat-Widget.css"

function Chat_Widget(props: any){
    return(
        <div className="chat_list">
            {/* <img src="" alt="" className="avatar" /> */}
            <div className="avatar"></div>
            <div className="chat_text">
                <div className="chat_name">
                    <span className="chat_user_name">{props.user_name}</span>
                    <span className="last_time">{props.last_time}</span>
                </div>
                <div className="last_message">
                    <span className="message">{props.message}</span>
                    <div className="new_message">
                        <span className="count">2</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat_Widget;