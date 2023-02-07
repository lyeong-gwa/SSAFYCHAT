// input 태그의 앞 부분 아이콘을 나타내는 위젯입니다.

function Icon(props: any){
    const com_shape = "img/com_shape.png";          // 회사
    const ma_shape = "img/ma_shape.png";            // 직종
    const ssafy_id_shape = "img/ssafy_id_shape.png" // 학번
    const name_shape = "img/name_shape.png";
    const email_shape = "/img/email_shape.png";
    const lock_shape = "img/lock_shape.png";
    switch (props.item){
        case 'id':
            return <div className="icon" id="email">
                <img src={email_shape} alt="email_icon" />
            </div>
        case 'pwd':
            return <div className="icon" id="lock">
                <img src={lock_shape} alt="lcok_icon" />
            </div>
        case 'job':
            return <div className="icon" id="job">
                <img src={ma_shape} alt="job_icon" />
            </div>
        case 'ssafy_id':
            return <div className="icon" id="ssafy_id">
                <img src={ssafy_id_shape} alt="ssafy_id" />
            </div>
        case 'name':
            return <div className="icon" id="name">
                <img src={name_shape} alt="name" />
            </div>
        case 'company':
            return <div className="icon" id="company">
                <img src={com_shape} alt="company" />
            </div>
        default:
            return null;
    }
}

export default Icon;