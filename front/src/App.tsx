import {Route, Routes} from 'react-router-dom';
import './App.css';
import Join from './components/user/Join';
import Login from './components/user/Login';
import VideoConferenceContainer from './container/VideoConferenceContainer';
import MainPage from './pages/MainPage';
import MyPage from './pages/MyPage';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login></Login>}></Route>
        <Route path='/index' element={<MainPage></MainPage>}></Route>
        <Route path='/mypage' element={<MyPage></MyPage>}></Route>
        <Route path='/meeting' element={<VideoConferenceContainer></VideoConferenceContainer>}></Route>
        <Route path='/join' element={<Join></Join>}></Route>
      </Routes>
    </div>
  );
}

export default App;
