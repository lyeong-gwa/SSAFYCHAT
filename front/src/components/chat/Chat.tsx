import "../../styles/components/chat/Chat.css";
import Chat_Widget from "../../widget/Chat-Widget";
import Messages from "../../widget/Messages";

function Chat(){
    const imgUrlMenu = "/img/chat_menu.png"
    const imgUrlSearch = "/img/chat_Search.png"
    return(
        <div className="chat_container">
            <div className="bg">
                <div className="left_sidebar">
                    <div className="search_bar">
                        <div className="menu_icon1">
                            <div className="menu_icon2">
                                <img src={imgUrlMenu} alt="menu" className="chat_menu" />
                            </div>
                        </div>
                        <div className="search_container">
                            <div className="search_icon">
                                <img src={imgUrlSearch} alt="search" className="chat_search" />
                            </div>
                            <input type="text" name="search" id="search" className="search_text" />
                        </div>
                    </div>
                    <div className="chats_list">
                        <Chat_Widget user_name="김겨울" last_time="18:30" message="멘토링 감사합니다."></Chat_Widget>
                    </div>
                </div>
                <div>
                    <Messages></Messages>
                </div>
            </div>
        </div>
    )
}

export default Chat;