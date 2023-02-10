import Header from "../layout/Header"
import Footer from "../layout/Footer"
import MainContainer from "../container/MainContainer"
import { Route,Routes } from "react-router"
import VideoConferenceContainer from "../container/VideoConferenceContainer"

function MainPage (){
    return (
        <div>
            <Header></Header>
                <Routes>
                    <Route path="/" element={<MainContainer></MainContainer>}></Route>
                    <Route path="/meeting" element={<VideoConferenceContainer></VideoConferenceContainer>}></Route>        
                </Routes>
            <Footer></Footer>
        </div>
    )
}
export default MainPage