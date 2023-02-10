import Banner from "../components/common/Banner"
import ApplyingContainer from "../container/ApplyingContainer"
import Footer from "../layout/Footer"
import Header from "../layout/Header"
import { Route,Routes } from "react-router"
import { useAppSelector } from '../hooks/hooks'
import MyPageContainer from "../container/MyPageContainer"
import ReservationContainer from "../container/ReservationContainer"
import RollingPaper from "../components/rollingpaper/rollingpaper"
import MentorReservationContainer from "../container/MentorReservationContainer"

function BannerPage (){
    return(
        <div>
            <Header></Header>
            <Banner name={useAppSelector(state => state.user.banner)} imgName="banner1"></Banner>
            <Routes>
                <Route path="/apply" element={<ApplyingContainer></ApplyingContainer>}></Route>
                <Route path="/mypage" element={<MyPageContainer></MyPageContainer>}></Route>
                <Route path="/mentoring" element={<ReservationContainer></ReservationContainer>}></Route>
                <Route path="/confirm" element={<MentorReservationContainer></MentorReservationContainer>}></Route>
                <Route path="/roll" element={<RollingPaper></RollingPaper>}></Route>
            </Routes>
            <Footer></Footer>
        </div>
    )
}

export default BannerPage