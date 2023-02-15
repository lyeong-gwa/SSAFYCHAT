import "../styles/widget/mentoring-chat.css"
import { useAppSelector } from "../hooks/hooks";
function formatDate(inputdate : any){
    const date = new Date(inputdate);
    const formattedDate = date.toISOString().substring(11,16);
    return formattedDate;
}

function Chat(props: any){
    let id = useAppSelector(state=>state.user.userId)
    const who_msg = props.chat.user_id === id ? "my_msg" : "other_msg";
    const who_message = props.chat.user_id === id ? "my_message" : "o_message";
    const who_time = props.chat.user_id === id ? "my_time" : "o_time";
    return(
        <div className={who_msg}>
                    <div className={who_message}>
                        <span>{props.chat.message}</span>
                        <div className={who_time}>
                            <span>{formatDate(props.chat.Date)}</span>
                        </div>
                    </div>
                </div>
    )
}

function Messages(props: any){
    const imgUrlEmoji = "/img/emoji.png";
    const imgUrlSend = "/img/send.png";
    let checkdate = Array();
    return(
        <div className="chat_content_container">
            <div className="content">
                
                    
                <div className="messages" id="messages">
                    {props.tmplog.map((chat: any, index: number) => {
                        const day = new Date(chat.Date).toISOString().substring(0,10);
                        if(!checkdate.includes(day)){
                            checkdate.push(day);
                            return ( 
                                <>
                                    <div className="date1">
                                        <div className="date2">
                                            <span>{day}</span>
                                        </div>
                                    </div>
                                    <Chat key={index} chat={chat} ></Chat>
                                </>);
                        }else{
                            return ( 
                                <Chat key={index} chat={chat} ></Chat>);
                        }
                    })} 
                    
                </div>
            </div>
        
        </div>
        
    )
}

export default Messages;