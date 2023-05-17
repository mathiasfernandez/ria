import React from 'react';
import { Navigate } from 'react-router-dom';


function PrivateRoute({ component: Component, isAuth, redirectPath, ...rest }) {
    return isAuth ?
        <Component {...rest}
            title={rest.title}
            esHome={rest.esHome}
            logo={rest.logo}
        />
        : <Navigate to={redirectPath} />


}
export default PrivateRoute;