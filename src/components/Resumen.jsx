import React, { useState, useEffect } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import '../css/animations.scss';
import '../css/traductor-style.scss';
import '../css/resumen.scss';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

function Resumen(props) {
  const apiUrl = process.env.REACT_APP_CHAT_GPT_API_TRADUCCIONES_URL;
  const [textoResumido, setTextoResumido] = useState(null);
  const [fadeOut, setFadeOut] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        setTextoResumido(null);
        setLoading(true);
  
        const messages = [
          { role: "user", content: `Hace un resumen de este texto "${props.textoAResumir}` }
        ];
        const timestamp = Date.now(); // Obtener un timestamp único
        const response = await fetch(`${apiUrl}?timestamp=${timestamp}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.REACT_APP_CHAT_GPT_API_KEY}`
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: messages,
            temperature: 0
          })
        });
  
        if (!response.ok) {
          throw new Error(`${response.status}`);
        }
  
        const data = await response.json();
        const resumen = data.choices[0].message.content;
        setTextoResumido(resumen);
      }
      catch (error) {
        switch (parseInt(error.message)) {
          case 401:
            setAlert('Api Key invalida, contactá con el administrador para solucionar el problema.');
            break;
          case 429:
            setAlert('Excediste la cantidad de request diarias, no te preocupes! Esto sucede por una limitación de CHAT GPT y su versión gratuita, lo intentaremos nuevamente por vos cada 20 segundos :)');
            setLoading(true);
            setTimeout(() => fetchData(), 20000); // Intenta nuevamente después de 20 segundos
            return; // Sale de la función para evitar el setLoading(false) en el bloque finally      
          case 500:
            setAlert('Ops, estamos teniendo problemas con el servicio de IA, inténtalo nuevamente más tarde.');
           break;
          default:
            setAlert('Ops, estamos teniendo inconvenientes. Inténtalo más tarde. :(');
            break;
        }
      }
      finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [apiUrl,props.textoAResumir]);

  const handleDelete = () => {
    setFadeOut(true);
    setTimeout(() => {
      props.deleteResumen();
    }, 400); // Espera 400ms antes de eliminar realmente el componente para que se pueda ejecutar la animación
  };

  return (
    <div className={`container-resumen ${fadeOut ? 'fade-out' : 'fade-in'}`}>
      <div className={loading ? 'traductor-texto center' : 'traductor-texto'}>
        {loading ? <AiOutlineLoading3Quarters className='loading-icon' /> : ''}
        {textoResumido !== null ? textoResumido : alert}
      </div>

      <div className='traductor-icono' onClick={handleDelete}>
        <AiOutlineCloseCircle />
      </div>
    </div>
  );
}

export default Resumen;
