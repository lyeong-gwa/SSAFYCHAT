import "../styles/components/header.css"

function Header (){
    return (
        <div className="header">
            <div className="header_name">SSAFY CHAT</div>
            <nav className="navbar">
              <span><a href="#!">Home</a></span>
              <span><a href="#!">Mentoring</a></span>
              <span>
                <div className="dropdown">
                  <span className="dropbtn"> 
                  <span>
                    <div className="dropbtn_image"></div>
                  </span>
                  <span>김겨울 님</span>
                  <span>
                    <div className="dropbtn_icon"></div>
                    </span>
                  </span>
                  <div className="dropdown_content">
                    <a href="#!">로그아웃</a>
                    <a href="#!">마이페이지</a>
                    <a href="#!">롤링페이퍼</a>
                  </div>
                </div>
              </span>
            </nav>
        </div>
    )
}

export default Header