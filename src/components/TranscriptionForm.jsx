import React from 'react';
import '../css/formulario-style.css'
import { useState } from 'react';
import {v4 as uuidv4} from 'uuid'
import {AiOutlineUpload} from 'react-icons/ai'
import {AiOutlineLoading3Quarters} from 'react-icons/ai'
import '../css/animations.css'


function TranscriptionForm(props){

    const [file, setFile] = useState();
	const [fileName, setFileName] = useState('Seleccionar archivo...');
	const [fileError, setFileError] = useState(false);
	const [loading, setLoading] = useState(false);

    const manejarFile = (event) => {
        const archivo = event.target.files[0]
        setFile(archivo);
		setFileName(archivo ? archivo.name : 'Seleccionar archivo...');
        console.log(event.target.files[0])
    };

    const manejarEnvio = (event) => {
		event.preventDefault()

		if (file == null) {
			setFileError(true);
			return;
		}
		else{
			setLoading(true);
			setFileError(false);
			const formData = new FormData()
			formData.append('file', file)
			formData.append('model', 'whisper-1')

			const url = 'https://api.openai.com/v1/audio/transcriptions'
			const body = {
				method: 'POST',
				body: formData,
				headers:{
					'Authorization': 'Bearer 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',
				}
			}
			
			fetch(url,body)
			.then((response) => {
				if(response.ok){
					return response.json();
				}
				else{
					throw response
				}
			})
			.then((data) => {
				console.log('sucess', data)

				const transcription = {
					id: uuidv4(),
					texto: data.text,
					date: new Date()
				}
				props.onSubmit(transcription);
				setFileName('Seleccionar archivo...');
				setLoading(false);

			})
			.catch(error => {
				if (error instanceof Response) {
					error.json()
					.then((errorData) => {
						props.handleAlert(`Error ${error.status}: ${errorData.error.message} ${errorData.error.code}`);
					});
				} 
				else{
					props.handleAlert(error);
				}
				setLoading(false);
			});
				
		}
    }

    return(
        <form className='transcription-formulario' action="" onSubmit={manejarEnvio}>
			<label className={fileError ? 'transcription-input-error' : 'transcription-input'}>
				<span>{fileName}</span>
				<AiOutlineUpload className='upload-icon'/>
				<input
					id="fileId" 
					type="file" 
					name='file'
					key={file}
					onChange={manejarFile}>
					
				</input>
			</label>
            <button className={ loading ? 'transcription-boton-disabled' : 'transcription-boton'} disabled={loading ? true : false}>
                {loading ? <AiOutlineLoading3Quarters className='loading-icon'/> : 'Transcribir'}
            </button>
        </form>

    )
}

export default TranscriptionForm