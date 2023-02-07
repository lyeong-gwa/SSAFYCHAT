import "../styles/widget/sticky-style.css"

function Sticky(props: any){
    return(
        <div className="sticky_main">
            <div className="title">
                {props.title}
            </div>
            <div className="text">
                {props.text}
            </div>
        </div>
    )
}

export default Sticky;