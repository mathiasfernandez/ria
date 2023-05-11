import React from 'react';
import '../css/alert.css'
import {AiOutlineCloseCircle} from 'react-icons/ai'
import '../css/animations.css'
import { useState } from 'react';

function Alert({ texto, deleteAlert }) {
  const [fadeOut, setFadeOut] = useState(false);

  const handleDelete = () => {
    setFadeOut(true);
    setTimeout(() => {
      deleteAlert();
    }, 400); // Espera 400ms antes de eliminar realmente el componente para que se pueda ejecutar la animacion
  }

  return(
    <div className={`container-alert ${fadeOut ? 'fade-out' : 'fade-in'}`}>
    
      <div className='alert-texto'>
        {texto}
      </div>

      <div className='alert-icono' onClick={handleDelete}>
        <AiOutlineCloseCircle/>
      </div>
    </div>  
  )
}

export default Alert;