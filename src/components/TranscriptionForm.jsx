import React from 'react';
import '../css/formulario-style.scss';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AiOutlineUpload } from 'react-icons/ai';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import '../css/animations.scss';

function TranscriptionForm(props) {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState('Seleccionar archivo...');
  const [fileError, setFileError] = useState(false);
  const [loading, setLoading] = useState(false);

  const manejarFile = (event) => {
    const archivo = event.target.files[0];
    setFile(archivo);
    setFileName(archivo ? archivo.name : 'Seleccionar archivo...');
  };

  const manejarEnvio = (event) => {
    event.preventDefault();

    if (file == null) {
      setFileError(true);
      return;
    } else {
      const allowedFormats = ['audio/mp3', 'audio/mpeg','audio/m4a', 'audio/mp4', 'video/mp4','video/m4a', 'video/mpeg', 'video/avi', 'video/mov'];
      const isFileValid = allowedFormats.includes(file.type);

      if (!isFileValid) {
        setFileError(true);
		props.handleAlert('Ups! Formato incorrecto estos son los formatos aceptados : [audio/mp3', 'audio/mpeg','audio/m4a', 'audio/mp4', 'video/mp4','video/m4a', 'video/mpeg', 'video/avi', 'video/mov]');
        return;
      }

	  async function fetchData(){
      setLoading(true);
      setFileError(false);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('model', 'whisper-1');

      const body = {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_CHAT_GPT_API_KEY}`,
        },
      };

      fetch(process.env.REACT_APP_CHAT_GPT_API_AUDIO_URL, body)
        .then((response) => {
          if (response.ok) {
			setLoading(true);
            return response.json();
          } else {
            throw response;
          }
        })
        .then((data) => {
          const transcription = {
            id: uuidv4(),
            texto: data.text,
            date: new Date(),
          };
          props.onSubmit(transcription);
          setFileName('Seleccionar archivo...');
          setLoading(false);
        })
        .catch((error) => {
          if (error instanceof Response) {
            error.json().then((errorData) => {
              const statusCode = parseInt(error.status);
              switch (statusCode) {
                case 401:
                  props.handleAlert('Api Key invalida, contactá con el administrador para solucionar el problema.');
                  break;
                case 429:
                  props.handleAlert('Excediste la cantidad de request diarias, no te preocupes! Esto sucede por una limitación de CHAT GPT y su versión gratuita.lo intentaremos nuevamente por vos cada 20 segundos :)');
                  setLoading(true);
                  setTimeout(() => fetchData(), 20000); // Intenta nuevamente después de 20 segundos
                  return; // Sale de la función para evitar el setLoading(false) en el bloque finally      
                case 500:
                  props.handleAlert('Ops, inténtalo nuevamente más tarde.');
                  break;
                default:
                  props.handleAlert('Ops, estamos teniendo problemas con el servicio de IA,  inténtalo nuevamente más tarde.');
                  break;
              }
            });
          } else {
            props.handleAlert(error);
          }
          setLoading(false);
        });
    }
	fetchData();
  };
}

  return (
    <form className="transcription-formulario" action="" onSubmit={manejarEnvio}>
      <label className={fileError ? 'transcription-input-error' : 'transcription-input'}>
        <span>{fileName}</span>
        <AiOutlineUpload className="upload-icon" />
        <input id="fileId" type="file" name="file" key={file} onChange={manejarFile} />
      </label>
      <button className={loading ? 'transcription-boton-disabled' : 'transcription-boton'} disabled={loading ? true : false}>
        {loading ? <AiOutlineLoading3Quarters className="loading-icon" /> : 'Transcribir'}
      </button>
    </form>
  );
}

export default TranscriptionForm;