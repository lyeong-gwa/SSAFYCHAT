import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/hooks'
import MainPage from '../pages/MainPage';

const PublicRoute = () => {
    const IS_LOG_IN = useAppSelector(state => state.user.isLogin);
    const ROLE = useAppSelector(state => state.user.role);

    // role_mentee, role_mentor
    // if(IS_LOG_IN){
    //     switch(ROLE){
    //         case 'role_mentee':
    //             return <Navigate to=""
    //     }
    // }
}

export default PublicRoute;