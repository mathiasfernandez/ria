import React, { useState } from 'react';
import '../css/animations.css';
import '../css/transcription-style.css';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import Resumen from './Resumen'; // Importa el componente Resumen

function Transcription({ id, texto, date, deleteTranscription, handleIdioma }) {
  const [fadeOut, setFadeOut] = useState(false);
  const [slideDown] = useState(false);
  const [idiomaDestino, setIdiomaDestino] = useState(); // valor predeterminado: español
  const [mostrarResumen, setMostrarResumen] = useState(false);

  const handleIdiomaChange = (e) => {
    setIdiomaDestino(e.target.value);
    handleIdioma(e.target.value, texto, id);
  };

  const handleResumenClick = () => {
    setMostrarResumen(true); // Mostrar el componente Resumen
  };

  const handleDelete = () => {
    setFadeOut(true);
    setTimeout(() => {
      deleteTranscription(id);
    }, 400);
  };

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
  };

  return (
    <div className={`container-transcription ${fadeOut ? 'fade-out' : 'fade-in'} ${slideDown ? 'slide-down' : ''}`}>
      <div className='transcription-texto'>
        <p>{formatoFecha(date)}<br></br>{texto}</p>
      </div>

      <div className='traducir-texto'>
        <select className='select-input' value={idiomaDestino} onChange={handleIdiomaChange}>
          {!idiomaDestino && <option defaultValue>Traducir</option>}
          <option value='en'>Ingles</option>
          <option value='fr'>Frances</option>
          <option value='it'>Italiano</option>
          {/* agregar más opciones de idioma aquí */}
        </select>
      </div>

      <div className='delete-icono' onClick={handleDelete}>
        <AiOutlineCloseCircle/>
      </div>

      <div>     
        <button onClick={handleResumenClick}>Resumir</button>

        {mostrarResumen && <Resumen textoATraducir={texto} deleteResumen={() => setMostrarResumen(false)} />}

      </div>
    </div>
  );
}

export default Transcription;