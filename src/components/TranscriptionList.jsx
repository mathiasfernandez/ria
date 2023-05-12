import React, { useState } from 'react';
import '../css/transcription-list-style.css';
import TranscriptionForm from './TranscriptionForm';
import Transcription from './Transcription';
import '../css/animations.css';

function TranscriptionList() {
  const [transcriptions, setTranscriptions] = useState([]);

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
        onSubmit={addTranscription} //on submit es un props no un eventlistener
      />
      <div className='transcription-list-contenedor'>
        {
          transcriptions.map((transcription) =>
            <><Transcription
              key={transcription.id}
              id={transcription.id}
              texto={transcription.texto}
              date={transcription.date}
              deleteTranscription={deleteTranscription} /></>

          )
        }
      </div>
    </>
  );
}

export default TranscriptionList;