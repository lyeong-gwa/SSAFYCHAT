import "../styles/widget/arrow-button.css"

// 화살표 버튼
function ArrowButton(props : any){
    return(
        <div className="arrow_button">
            <div className="arrow">
                {/* props로 <나 >를 받아 출력 */}
                {props.text}
            </div>
        </div>
    )
}

export default ArrowButton;