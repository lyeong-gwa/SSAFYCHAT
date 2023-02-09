import "../../styles/components/common/count-banner.css";

function Count(props: any){
    return (
        <span className="count">
            <div className="count_text">
                <ul>
                    <li className="count_text_num"><p>{props.item[1]}</p></li>
                    <li className="count_text_name"><p>{props.item[0]}</p></li>
                </ul>
            </div>
            <div className="count_line"></div>
        </span>
    )
}

function CountBanner(props: any) {
    return (
    <div className="count_banner">
        <span className="count_main">
            {props.name.map(function(nameItem:any){
                return(
                    <Count item={nameItem}></Count>
                )
            })}
        </span>
    </div>
    )
}

export default CountBanner;