import {Route, Routes} from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage';
import BannerPage from './pages/BannerPage';
import UserPage from './pages/UserPage';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/user/*" element={<UserPage></UserPage>}></Route>
        <Route path='/*' element={<MainPage></MainPage>}></Route>
        <Route path='/banner/*' element={<BannerPage></BannerPage>}></Route>
      </Routes>
      
      {/* <ReservationContainer></ReservationContainer> */}
    </div>
  );
}

export default App;
