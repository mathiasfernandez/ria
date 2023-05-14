import React, { useState, useEffect } from 'react';
import {AiOutlineCloseCircle} from 'react-icons/ai'
import '../css/animations.css'
import '../css/traductor-style.css'
import {AiOutlineLoading3Quarters} from 'react-icons/ai'

function Traductor(props) {
  const [textoTraducido, setTextoTraducido] = useState(null);
  const [fadeOut, setFadeOut] = useState(false);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    async function fetchData() {
      setTextoTraducido(null)
      setLoading(true);
      const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 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'
        },
        body: JSON.stringify({
          model : 'text-davinci-003',
          prompt: `Traducir "${props.textoATraducir}" al idioma ${props.idiomaDestino}.`,
          max_tokens: 4000,
          temperature: 0,
        })
      });
      const data = await response.json();
      setLoading(false)
      console.log(data);
      const traduccion = data.choices[0].text.trim();
      setTextoTraducido(traduccion);
    }
    fetchData();
  }, [props.textoATraducir, props.idiomaDestino]);


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
        {textoTraducido}
      </div>

      <div className='traductor-icono' onClick={handleDelete}>
        <AiOutlineCloseCircle/>
      </div>
    </div>  
  )

}

export default Traductor;