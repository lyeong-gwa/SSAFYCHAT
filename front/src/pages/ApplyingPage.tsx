import Banner from "../components/common/Banner"
import ApplyingContainer from "../container/ApplyingContainer"
import Footer from "../layout/Footer"
import Header from "../layout/Header"

function ApplyingPage (){
    return(
        <div>
            <Header></Header>
            <Banner name="멘토링 신청" imgName="banner1"></Banner>
            <ApplyingContainer></ApplyingContainer>
            <Footer></Footer>
        </div>
    )
}

export default ApplyingPage