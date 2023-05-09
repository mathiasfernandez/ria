import '../css/app-style.css';
import '../css/button-style.css'
import ria from '../resources/ria.png'
import { gapi } from 'gapi-script';
import GoogleLogin from 'react-google-login';
import { useEffect, useState } from 'react';
import Header from './Header';
import {Routes, Route, useNavigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute'

function App() {

  const client_id = "782599696503-cqs1s0i9im8ai7o576kl6vng1569chcr.apps.googleusercontent.com"

  useEffect(() => {
    const start = () => {
      gapi.auth2.init({
        clientId: client_id,
      })
    }
    gapi.load("client:auth2", start)
  }, []);

  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();


  const onSuccess = (response) => {
    setUser(response.profileObj)
    setIsAuthenticated(true)
    navigate('/home')
    console.log(response)
  }

  const onFailure = (response) => {
    console.log("Disculpa, algo salio mal, vuelva a intentar")
  }

  return (
      <div className='app'>
        <Routes>
          <Route path='/' element={
            <div className='contenedor-principal'>
              <Header 
                title={"Iniciar Sesion"}
                logo={ria}
                esHome={false}
              />
              <GoogleLogin
                clientId={client_id}
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={"single_host_policy"}
                className='btn-google'  
              />
            </div>
          }/>

          <Route exact path='/home'
            element={
              <PrivateRoute
                component={Header}
                isAuth={isAuthenticated}
                title={"Bienvenido " + user.name}
                logo={user.imageUrl}
                esHome={true}
                redirectPath="/"
              />
            }
          />
      </Routes>
    </div>
  );
}

export default App;
