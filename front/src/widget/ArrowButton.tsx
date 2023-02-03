import "../styles/widget/arrow-button.css"

function ArrowButton(props : any){
    return(
        <div className="arrow_button">
            <div className="arrow">
                {props.text}
            </div>
        </div>
    )
}

export default ArrowButton;