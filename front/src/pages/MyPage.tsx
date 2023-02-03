import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Banner from "../components/common/Banner";
import MyPageContainer from "../container/MyPageContainer";

function MyPage() {
  return (
    <div>
      <Header></Header>
      <Banner name="마이페이지" imgName="banner1"></Banner>
      <MyPageContainer></MyPageContainer>
      <Footer></Footer>
    </div>
  );
}
export default MyPage;
