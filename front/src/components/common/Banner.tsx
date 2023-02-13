import "../../styles/components/common/banner.css";

function Banner(props: any) {
    const banner_img = {
        backgroundImage: `url(${process.env.PUBLIC_URL}/img/${props.imgName}.png)`,
        backgroundSize: "cover",
    } as React.CSSProperties;

    return (
    <div className="banner_main" style={banner_img}>
        <div className="banner_name_main">
            <div className="banner_name">
                <h2 className="banner_title">{props.name}</h2>
            </div>
        </div>
    </div>
    )
}

export default Banner;