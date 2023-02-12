import "../styles/widget/mentoring-chat.css"
function formatDate(inputdate : any){
    const date = new Date(inputdate);
    const formattedDate = date.toISOString().substring(11,16);
    return formattedDate;
}

function Chat(props: any){
    const who_msg = props.chat.user_id === 1 ? "my_msg" : "other_msg";
    const who_message = props.chat.user_id === 1 ? "my_message" : "o_message";
    const who_time = props.chat.user_id === 1 ? "my_time" : "o_time";
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

// props.tmplog = [{"user_id":false,"message":"aa","Date":1676001100809},{"user_id":false,"message":"aa","Date":1676001110317},{"user_id":false,"message":"??","Date":1676001114944},{"user_id":false,"message":"??","Date":1676001254805},{"user_id":false,"message":"?","Date":1676001260116},{"user_id":false,"message":"?","Date":1676001260936},{"user_id":false,"message":"?","Date":1676001261621},{"user_id":false,"message":"?","Date":1676001266832},{"user_id":false,"message":"?","Date":1676001268549},{"user_id":false,"message":"?","Date":1676001269810},{"user_id":false,"message":"?","Date":1676001276201},{"user_id":false,"message":"?","Date":1676001277461},{"user_id":false,"message":"?","Date":1676001278317}];


function Messages(props: any){
    const imgUrlEmoji = "/img/emoji.png";
    const imgUrlSend = "/img/send.png";
    let checkdate = Array();
    return(
        <div>
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