import React, { useState } from 'react';
import '../css/animations.scss';
import '../css/transcription-style.scss';
import { AiOutlineCloseCircle } from 'react-icons/ai';

function Transcription({ id, texto, date, deleteTranscription, handleIdioma, handleResumen }) {
  const [fadeOut, setFadeOut] = useState(false);
  const [slideDown] = useState(false);
  const [idiomaDestino, setIdiomaDestino] = useState(); // valor predeterminado: español
  const [error, setError] = useState('');

  const handleIdiomaChange = (e) => {
    setIdiomaDestino(e.target.value);
    handleIdioma(e.target.value, texto, id);
  };

  const handleResumenClick = () => {
    try {
      handleResumen(texto, id);
    } catch (error) {
      setError('Error al generar el resumen');
    }
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
        {formatoFecha(date)}
        <br />
        {texto}
      </div>

      <div className='traducir-texto'>
        <select className='select-input' value={idiomaDestino} onChange={handleIdiomaChange}>
          {!idiomaDestino && <option defaultValue>Traducir</option>}
          <option value='en'>Ingles</option>
          <option value='fr'>Frances</option>
          <option value='it'>Italiano</option>
          <option value='es'>Español</option>
          {/* agregar más opciones de idioma aquí */}
        </select>
      </div>

      <div>
        <button className='btn-resumen' onClick={handleResumenClick}>Resumir</button>
      </div>

      <div className='delete-icono' onClick={handleDelete}>
        <AiOutlineCloseCircle />
      </div>

      {error && <div className='error-message'>{error}</div>}
    </div>
  );
}

export default Transcription;