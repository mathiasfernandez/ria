import React, { useState, useEffect } from 'react';

function Traductor(props) {
  const [textoTraducido, setTextoTraducido] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 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'
        },
        body: JSON.stringify({
          model : 'text-davinci-003',
          prompt: `Traducir "${props.texto}" al idioma ${props.idiomaDestino}.`,
          max_tokens: 4000,
          temperature: 0,
        })
      });
      const data = await response.json();
      console.log(data);
      const traduccion = data.choices[0].text.trim();
      setTextoTraducido(traduccion);
    }
    fetchData();
  }, [props.texto, props.idiomaDestino]);

  if (!textoTraducido) {
    return <p>Traduciendo...</p>;
  }

  return (
    <div>
      <p>{textoTraducido}</p>
    </div>
  );
}

export default Traductor;