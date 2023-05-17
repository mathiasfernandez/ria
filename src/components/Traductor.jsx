import React, { useState, useEffect } from 'react';
import {AiOutlineCloseCircle} from 'react-icons/ai'
import '../css/animations.scss'
import '../css/traductor-style.scss'
import {AiOutlineLoading3Quarters} from 'react-icons/ai'

function Traductor(props) {
  const apiUrl = process.env.REACT_APP_CHAT_GPT_API_TRADUCCIONES_URL;
  const [textoTraducido, setTextoTraducido] = useState(null);
  const [fadeOut, setFadeOut] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState();

  useEffect(() => {
    async function fetchData() {
      setTextoTraducido(null)
      setLoading(true);

      try {
        const messages = [
          { role: "user", content: `Traducir "${props.textoATraducir}" al idioma ${props.idiomaDestino}.` }
        ];

        const response = await fetch(apiUrl, {
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
          throw response
        }
  
        const data = await response.json();
        console.log(data);
        const traduccion = data.choices[0].message.content;
        setTextoTraducido(traduccion);
        setLoading(false);
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
  }, [props.idiomaDestino]);


  const handleDelete = () => {
    setFadeOut(true);
    setTimeout(() => {
      props.deleteTraduccion();
    }, 400); // Espera 400ms antes de eliminar realmente el componente para que se pueda ejecutar la animacion
  }

  return(
    
    <div className={`container-traductor ${fadeOut ? 'fade-out' : 'fade-in'}`}>
      <div className={loading ? 'traductor-texto center' : 'traductor-texto'}>
        {loading ? <AiOutlineLoading3Quarters className='loading-icon'/> : ''}

        {textoTraducido ? textoTraducido : alert}

      </div>

      <div className='traductor-icono' onClick={handleDelete}>
        <AiOutlineCloseCircle/>
      </div>


  </div>  
  )

}

export default Traductor;