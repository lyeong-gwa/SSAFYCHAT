import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/hooks'
import MainPage from '../pages/MainPage';

const ProtectRoute = () => {
    const IS_LOG_IN = useAppSelector(state => state.user.isLogin);
    if(!IS_LOG_IN){
        return <Navigate to="/user/login" />
    }
    return <MainPage/>
}

export default ProtectRoute;