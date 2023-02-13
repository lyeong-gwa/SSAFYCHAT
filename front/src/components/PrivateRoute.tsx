// import { Navigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/hooks'
import UserPage from '../pages/UserPage';

const PrivateRoute = () => {
    const IS_LOG_IN = useAppSelector(state => state.user.isLogin);
    if(IS_LOG_IN){
        return <Navigate to="/" />
    }
    return <UserPage/>
}

export default PrivateRoute;