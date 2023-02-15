import { useEffect, useState } from 'react'
import '../styles/widget/applying-card.css'
function ApplyingCard (props: any){

    const [belongImage, setImage] = useState('');
    useEffect(()=>{
        switch(props.mentoring.belong){
            case "네이버": setImage(require('../assets/Naver_Logotype.svg.png')); break;
            case "넥슨": setImage(require('../assets/Nexon_Logo.svg.png')); break;
            case "당근마켓": setImage(require('../assets/DaangnMarket_logo.png')); break;
            case "라인": setImage(require('../assets/LINE_Corporation_Logo.png')); break;
            case "카카오": setImage(require('../assets/kakao_logo.png')); break;
            default: setImage(require('../assets/SSAFY_CHAT.png'));
        }
    },[])

    return(
        <div className="applying_card_widget">
            <div>
                <img className='belongImage' src={belongImage} alt="" />
            </div>
            <div className='applying_card_text'>
                {props.mentoring.belong}
            </div>
            <div className='applying_card_text'>
                {props.mentoring.job}
            </div>
        </div>
    )
}

export default ApplyingCard