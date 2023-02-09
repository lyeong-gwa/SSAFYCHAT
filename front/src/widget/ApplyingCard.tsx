import '../styles/widget/applying-card.css'
function ApplyingCard (props: any){
    return(
        <div className="applying_card_widget">
            <div>
                <img src={require('../assets/kakao_logo.png')} alt="" />
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