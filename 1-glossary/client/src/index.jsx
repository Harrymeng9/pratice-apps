import react from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect} from 'react';
const axios = require('axios');
import Create from './components/Create.jsx';
import TermList from './components/TermList.jsx';

const Root = (props) => {

  const [allTerms, setAllTerms] = useState([]);

// User refresh the page, it will show exiting terms/definitions
  useEffect( ()=> {
    axios.get('/glossary')
      .then((result)=>{
        setAllTerms(result.data);
      })
  },[])

  return (
    <div>
      <h1>Hello World HeyHey</h1>
      <div>
        <Create setAllTerms={setAllTerms} />
      </div>
      <br></br>
      <div>
        <TermList allTerms={allTerms} setAllTerms={setAllTerms}/>
      </div>
    </div>
  )
};

ReactDOM.render(<Root />, document.getElementById('root'));

export default Root;