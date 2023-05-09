import React from 'react';
import '../css/header-login-style.css'


function Header({ title, logo, esHome}){
    return(
      <div className= {esHome ? 'title-home' : 'title-login'} >
        {title}
        <div className='logo-conteiner'>
            <img className='logo-style' src={logo} alt='Logo' />
        </div>
      </div>

    );

}
export default Header;