import React, { useState, useEffect } from 'react';
import Traductor from './Traductor';
import '../css/animations.css'
import '../css/transcription-style.css'
import {AiOutlineCloseCircle} from 'react-icons/ai'

function Transcription({ id, texto, date, deleteTranscription }) {
  const [fadeOut, setFadeOut] = useState(false);
  const [slideDown, setSlideDown] = useState(false);
  const [idiomaDestino, setIdiomaDestino] = useState('en'); // valor predeterminado: español

  const handleIdiomaChange = (e) => {
    setIdiomaDestino(e.target.value);
  };

  // useEffect(() => {
  //   setSlideDown(true);

  //   return () => {
  //     // Restablece el estado de slideDown cuando el componente se desmonta
  //     setSlideDown(false);
  //   };
  // }, []);

  const handleDelete = () => {
    setFadeOut(true);
    setTimeout(() => {
      deleteTranscription(id);
    }, 400); // Espera 400ms antes de eliminar realmente el componente para que se pueda ejecutar la animacion
  }

  const formatoFecha = (date) => {
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    return date.toLocaleString('es-ES', options);
  }
  return (

<div className={`container-transcription ${fadeOut ? 'fade-out' : 'fade-in'} ${slideDown ? 'slide-down' : '' }`}>
    
    <div className='transcription-texto'>
      <p>{formatoFecha(date)}<br></br>{texto}</p>  
        <select value={idiomaDestino} onChange={handleIdiomaChange}>
          <option value='en'>Ingles</option>
          <option value='fr'>Frances</option>
          <option value='it'>Italiano</option>
          {/* agregar más opciones de idioma aquí */}
        </select>
        <p><Traductor className='transcription-texto' texto={texto} idiomaDestino={idiomaDestino} /></p>
       
        <div className='transcription-icono' onClick={handleDelete}>
        <AiOutlineCloseCircle/>
      </div>
      </div>
      </div>
 
  );
}

export default Transcription;