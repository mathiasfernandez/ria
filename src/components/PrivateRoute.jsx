import React from 'react';
import { Navigate } from 'react-router-dom';
import UploadFile from './UploadFile'

function PrivateRoute({ component:Component, isAuth, redirectPath, ...rest }){
    
    return isAuth ? 

        <div>
        <Component {...rest}
            title={rest.title}
            esHome={rest.esHome}
            logo={rest.logo} />


        <UploadFile/>
        </div>
        
        : <Navigate to={redirectPath} />

        

        

        
        


}
export default PrivateRoute;