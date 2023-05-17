import React, { useState, useEffect } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import '../css/animations.scss';
import '../css/traductor-style.scss';
import '../css/resumen.scss';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

function Resumen(props) {
  const [textoResumido, setTextoResumido] = useState(null);
  const [fadeOut, setFadeOut] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        setTextoResumido(null);
        setLoading(true);

        const messages = [
          { role: "user", content: `Resumi y dale un formato de lectura adecuado el texto: "${props.textoAResumir}` }
        ];

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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'
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: messages,
            temperature: 0
          })
        });  
        if (!response.ok) {
          throw response;
        }
  
        const data = await response.json();
        const resumen = data.choices[0].message.content;
        setTextoResumido(resumen);
        setLoading(false)
      }
      catch (error) {
        if (error instanceof Response) {
					error.json()
					.then((errorData) => {
						setAlert(`Error ${error.status}: ${errorData.error.message} ${errorData.error.code}`);
					});
				} 
				else{
					setAlert(error);
				}
				setLoading(false);
      }
    }
  
    fetchData();
  }, []);

  const handleDelete = () => {
    setFadeOut(true);
    setTimeout(() => {
      props.deleteResumen();
    }, 400); // Espera 400ms antes de eliminar realmente el componente para que se pueda ejecutar la animacion
  };

  return (
    <div className={`container-resumen ${fadeOut ? 'fade-out' : 'fade-in'}`}>
      <div className={loading ? 'traductor-texto center' : 'traductor-texto'}>
        {loading ? <AiOutlineLoading3Quarters className='loading-icon' /> : ''}
        {textoResumido ? textoResumido : alert}
      </div>

      <div className='traductor-icono' onClick={handleDelete}>
        <AiOutlineCloseCircle />
      </div>
    </div>
  );
}

export default Resumen;