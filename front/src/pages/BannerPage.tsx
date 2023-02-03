import Banner from "../components/common/Banner"
import ApplyingContainer from "../container/ApplyingContainer"
import Footer from "../layout/Footer"
import Header from "../layout/Header"
import { Route,Routes } from "react-router"
import MyPageContainer from "../container/MyPageContainer"

function BannerPage (){
    return(
        <div>
            <Header></Header>
            <Banner name="멘토링 신청" imgName="banner1"></Banner>
            <Routes>
                <Route path="/apply" element={<ApplyingContainer></ApplyingContainer>}></Route>
                <Route path="/mypage" element={<MyPageContainer></MyPageContainer>}></Route>
            </Routes>
            <Footer></Footer>
        </div>
    )
}

export default BannerPage