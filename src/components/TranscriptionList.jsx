import React, { useState, useEffect } from 'react';
import '../css/transcription-list-style.scss';
import TranscriptionForm from './TranscriptionForm';
import Transcription from './Transcription';
import '../css/animations.scss';
import Alert from './Alert';
import Traductor from './Traductor';
import Resumen from './Resumen';

function TranscriptionList() {
  const[transcriptions, setTranscriptions] = useState([]);
  const[alert, setAlert] = useState();
  const[idioma, setIdioma] = useState();
  const[textoAResumir, setTextoAResumir] = useState();
  const[textoATraducir, setTextoATraducir] = useState();
  const[selectedTranscriptionId, setSelectedTranscriptionId] = useState(null);
  const[selectedResumenId, setSelectedResumenId] = useState(null);



  useEffect(() => {
    setAlert();
  }, [transcriptions]);

  const handleAlert = (alert) => {
    setAlert(alert)
  }

  const deleteAlert = () => {
    setAlert()
  }

  const handleIdioma = (idioma, texto, transcriptionId) => {
    setIdioma(idioma)
    setTextoATraducir(texto)
    setSelectedTranscriptionId(transcriptionId)
  }

  const handleResumen = (texto, transcriptionId) => {
    setTextoAResumir(texto)
    setSelectedResumenId(transcriptionId)
  }

  const deleteResumen = () => {
    setTextoAResumir(null);
    setSelectedResumenId(null)
  }

  const deleteTraduccion = () => {
    setIdioma('')
    setTextoATraducir(null);
    setSelectedTranscriptionId(null);
  }

  const addTranscription = (transcription) => {
    const transcriptionsUpdate = [transcription, ...transcriptions];
    setTranscriptions(transcriptionsUpdate);
  };

  const deleteTranscription = (id) => {
    const transcriptionsUpdate = transcriptions.filter(
      (transcription) => transcription.id !== id
    );
    setTranscriptions(transcriptionsUpdate);
  };

  return (
    <>
      <TranscriptionForm
        onSubmit={addTranscription}
        handleAlert={handleAlert}
      />
      <div className='transcription-list-contenedor'>
        {alert && <Alert texto={alert} deleteAlert={deleteAlert} />}
        {transcriptions.map((transcription) => (
          <>
            <Transcription
              key={transcription.id}
              id={transcription.id}
              texto={transcription.texto}
              date={transcription.date}
              deleteTranscription={deleteTranscription}
              handleIdioma={handleIdioma}
              handleResumen={handleResumen}
            />
            {selectedTranscriptionId === transcription.id &&(
              <Traductor
                textoATraducir={textoATraducir}
                idiomaDestino={idioma}
                deleteTraduccion={deleteTraduccion}
              />
              
            )}
            {selectedResumenId === transcription.id && textoAResumir && (
            <Resumen 
              textoAResumir = {textoAResumir}
              deleteResumen = {deleteResumen}
            />
            )}
          </>
        ))}
      </div>
    </>
  );
}

export default TranscriptionList;