import {Route, Routes} from 'react-router-dom';
import './App.css';
import BannerPage from './pages/BannerPage';
import PrivateRoute from './components/PrivateRoute';
import ProtectRoute from './components/ProtectRoute';
function App() {
  return (
    <div className="App">
      <Routes>
        {/* 로그인 안된 상태에서만 조회 가능 */}
        <Route path="/user/*" element={<PrivateRoute></PrivateRoute>}></Route>
        {/* 메인페이지 => 로그인한 모든 권한 */}
        <Route path='/*' element={<ProtectRoute></ProtectRoute>}></Route>
        {/* 그 외 페이지 => 로그인 정보에 따른 페이징 처리 */}
        <Route path='/banner/*' element={<BannerPage></BannerPage>}></Route>
      </Routes>
    </div>
  );
}

export default App;
