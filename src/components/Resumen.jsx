import React, { useState, useEffect } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import '../css/animations.css';
import '../css/traductor-style.css';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

function Resumen(props) {
  const [textoResumido, setTextoResumido] = useState(null);
  const [fadeOut, setFadeOut] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setTextoResumido(null);
      setLoading(true);
      const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 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'
        },
        body: JSON.stringify({
          model : 'text-davinci-003',
          prompt: `Resumir "${props.textoATraducir}"`,
          max_tokens: 4000,
          temperature: 0,
        })
      });

      const data = await response.json();
      console.log(data);
      setLoading(false);
      console.log(data);
      
      const resumen = data.choices[0].text;
      setTextoResumido(resumen);
    }

    fetchData();
  }, [props.textoATraducir]);

  const handleDelete = () => {
    setFadeOut(true);
    setTimeout(() => {
      props.deleteTraduccion();
    }, 400); // Espera 400ms antes de eliminar realmente el componente para que se pueda ejecutar la animacion
  };

  return (
    <div className={`container-traductor ${fadeOut ? 'fade-out' : 'fade-in'}`}>
      <div className={loading ? 'traductor-texto center' : 'traductor-texto'}>
        {loading ? <AiOutlineLoading3Quarters className='loading-icon' /> : ''}
        {textoResumido}
      </div>

      <div className='traductor-icono' onClick={handleDelete}>
        <AiOutlineCloseCircle />
      </div>
    </div>
  );
}

export default Resumen;