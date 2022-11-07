import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const PrivateRoute = ({children}) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <div className='text-5xl'>Loading</div>
    }
    if (user) {
        return children;
    } 

    <Navigate to='/login' state={{from: location }} replace></Navigate>
    
    
};

export default PrivateRoute;