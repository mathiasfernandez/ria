import React from 'react';
import '../css/transcription-list-style.css'
import { useState, useEffect} from 'react';
import Transcription from './Transcription';
import TranscriptionForm from './TranscriptionForm'
import '../css/animations.css'
import Alert from './Alert';


function TranscriptionList(){
  const [transcriptions, setTranscriptions] = useState([]);
  const[alert, setAlert] = useState();

  useEffect(() => {
    setAlert();
  }, [transcriptions]);

  const handleAlert = (alert) => {
    setAlert(alert)
  }

  const deleteAlert = () => {
    setAlert()
  }

  const addTranscription = (transcription) => {
    const transcriptionsUpdate = [transcription, ...transcriptions]
    setTranscriptions(transcriptionsUpdate)
  }

  const deleteTranscription = (id) => {
    const transcriptionsUpdate = transcriptions.filter((transcription) => transcription.id !== id)
    setTranscriptions(transcriptionsUpdate)
  }

  return(
    <>
      <TranscriptionForm
        onSubmit={addTranscription}
        handleAlert={handleAlert} //on submit es un props no un eventlistener
      />
      <div className='transcription-list-contenedor'>
        {
          alert && <Alert texto={alert} deleteAlert={deleteAlert} />
        }
        {
          transcriptions.map((transcription) =>
            <Transcription
              key={transcription.id}
              id={transcription.id}
              texto={transcription.texto}
              date={transcription.date}
              deleteTranscription={deleteTranscription}/>
          )
        }

      </div>
    </>
  );
}

export default TranscriptionList;