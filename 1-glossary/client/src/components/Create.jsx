import react from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';
const axios = require('axios');

const Create = (props) => {

  const [term, setTerm] = useState('');
  const [definition, setDefinition] = useState('');

  function clickCreate(e) {
    if (term.length > 0 && definition.length > 0) {
      // if term exists, then ask client to enter a new one
      axios.post('/glossary', {
        term: term,
        definition: definition
      })
        .then((result) => {
          // result.data is false, which mean the term already exists
          if (!result.data) {
            alert('Term exists, please enter a new term/definition!');
          } else {
            axios.get('/glossary')
              .then((result) => {
                props.setAllTerms(result.data);
              })
              .catch((err) => {
                console.log(err);
              })
          }
        })

      setTerm('');
      setDefinition('');
    } else {
      alert('Please enter a valid term or definition!');
    }
  }

  return (
    <div>
      <div>Term: <input type='String' value={term} onChange={(e) => setTerm(e.target.value)} /> </div>
      <div>Definition: <input type='String' value={definition} onChange={(e) => setDefinition(e.target.value)} /> </div>
      <button onClick={clickCreate}>Create</button>
    </div>
  )
};

export default Create;