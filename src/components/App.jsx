import '../css/app-style.css';
import '../css/button-style.css'

import ria from '../resources/ria.png'
import { gapi } from 'gapi-script';
import GoogleLogin from 'react-google-login';
import { useEffect, useState } from 'react';
import Header from './Header';
import {Routes, Route, useNavigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute'
import TranscriptionList from './TranscriptionList';
import { MAX_HEADER_BUF } from 'lamejs/src/js/LameInternalFlags';

function App() {
  const client_id = "782599696503-cqs1s0i9im8ai7o576kl6vng1569chcr.apps.googleusercontent.com";

  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    return storedAuth ? JSON.parse(storedAuth) : false;
  });

  useEffect(() => {
    const start = () => {
      gapi.auth2.init({
        clientId: client_id,
      });
    };
    gapi.load("client:auth2", start);

    // Verificar si hay información de usuario en el almacenamiento local
    const storedUser = localStorage.getItem("user");
    console.log(storedUser);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, [client_id]);

  const navigate = useNavigate();

  console.log(isAuthenticated);

  const onSuccess = (response) => {
    setUser(response.profileObj);
    setIsAuthenticated(true);
    // Guardar la información del usuario en el almacenamiento local
    localStorage.setItem("user", JSON.stringify(response.profileObj));
    localStorage.setItem("isAuthenticated", true);
    navigate("/home");
    console.log(response);
  };

  const onFailure = (response) => {
    console.log("Disculpa, algo salió mal, vuelva a intentar");
  };

  const onLogoutSuccess = () => {
    // Limpiar la información del usuario del almacenamiento local
    localStorage.removeItem("user");

    setIsAuthenticated(false);
    setUser({});

    localStorage.setItem("isAuthenticated", false);
    navigate("/");
  };
  const handleInfo = () =>{
    navigate("/info");
  }
  const handleLogoutClick = () => {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(onLogoutSuccess);
  };

  const handleBack = () =>{
    navigate("/home");
  }

  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            <div className="contenedor-principal">
              <Header title={"Iniciar Sesion"} logo={ria} esHome={false} />
              <GoogleLogin
                clientId={client_id}
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={"single_host_policy"}
                className="btn-google"
              />
            </div>
          }
        />

        <Route
          exact
          path="/home"
          element={
            <div className="contenedor-gestor">
              <PrivateRoute
                component={Header}
                isAuth={isAuthenticated}
                title={"Bienvenido " + user.name}
                logo={user.imageUrl}
                esHome={true}
                redirectPath="/"
              />
              <TranscriptionList />
       <div className='wrapper'>
       <button  className="moreInfo" onClick={handleInfo}>Informacion</button>
       <button  className="test" onClick={handleLogoutClick}>Salir</button>
              
       </div>
          
            </div>
          }
        />

          <Route 
          exact
          path="/info"
          element={<div className='contenedor-gestor'>
            <ul>
             <h1 className='title-login2'>Integrantes:</h1> 
  <li>Mathias Fernandez</li>
  <b ul >
    <li>Correo:</li>
    <li>CI: 4.898.294-7</li>
  </b>
  <li>Mauro Restrepo</li>
  <b ul >
    <li>Correo: mauroc2006@hotmail.com</li>
    <li>CI: 4.637.057-2</li>
  </b>
  <li>Leonardo Ramirez</li>
  <b ul >
    <li>Correo: leonardo.ramirez99@gmail.com</li>
    <li>CI: 5.290.573-7</li>
  </b>
</ul>
<h1 className='title-login2'>Repositorio de la aplicacion: 

</h1> <a className="link" href='https://github.com/mathiasfernandez/ria'>Link
</a>

<button  className="test" onClick={handleBack}>Atras</button>
          </div>
          
          }
          />
              
      
      </Routes>
    </div>
  );
}

export default App;