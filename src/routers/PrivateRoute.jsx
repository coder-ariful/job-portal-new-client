import React, { useContext } from 'react';
import AuthContext from '../Context/AuthContext/AuthContext';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {

    const { user,loading } = useContext(AuthContext)
    const location = useLocation()

    if (loading) {
        return <div>Loading...</div>;
    }
    if (!user || user === null) {
        console.log('Hello world logout');
        return <Navigate to="/signIn" state={{ from: location }} replace={true} />;
    }
    return children;
};

export default PrivateRoute;