import React, { useState, useEffect } from 'react';
import '../css/transcription-list-style.css';
import TranscriptionForm from './TranscriptionForm';
import Transcription from './Transcription';
import '../css/animations.css';
import Alert from './Alert';
import Traductor from './Traductor';

function TranscriptionList() {
  const[transcriptions, setTranscriptions] = useState([]);
  const[alert, setAlert] = useState();
  const[idioma, setIdioma] = useState();
  const[textoATraducir, setTextoATraducir] = useState();
  const[selectedTranscriptionId, setSelectedTranscriptionId] = useState(null);


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

  const deleteTraduccion = () => {
    setIdioma('')
    setTextoATraducir('');
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
            />
            {selectedTranscriptionId === transcription.id && (
              <Traductor
                className='transcription-texto'
                textoATraducir={textoATraducir}
                idiomaDestino={idioma}
                deleteTraduccion={deleteTraduccion}
              />
            )}
          </>
        ))}
      </div>
    </>
  );
}

export default TranscriptionList;