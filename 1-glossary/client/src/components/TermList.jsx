import react from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';
const axios = require('axios');

const TermList = (props) => {

  const [update, setUpdate] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [filterInput, setFilterInput] = useState('');

  // Trigger it once only filterInput changed
  useEffect(() => {
    if (filterInput === 'Select a Filter') {
      axios.get('/glossary')
        .then((result) => {
          props.setAllTerms(result.data);
        })
        .catch((err) => {
          console.log(err);
        })
    } else {
      axios.get('/glossaryFilter', { params: { firstLetter: filterInput } })
        .then((result) => {
          props.setAllTerms(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [filterInput]);


  // Search Function
  function searchRecord(searchInput) {
    axios.get('/glossarySearch', { params: { term: searchInput } })
      .then((result) => {
        props.setAllTerms(result.data);
      })
      .catch((err) => {
        console.log(err);
      })
  };

  // Edit Function
  // If buttonText is 'Edit', once click it, it will be 'Update' and vice versa
  function editRecord(term, i) {
    var defId = 'definition' + i;
    var buttonID = 'Edit' + i;
    // Change buttonText from 'Edit' to 'Update' once click and vice versa
    var buttonText = document.getElementById(buttonID);
    if (buttonText.innerHTML === 'Edit') {
      buttonText.innerHTML = 'Update';
      // Change the fixed field to an 'Input' template
      // Create a new element <input ...>
      var editableInput = document.createElement("INPUT");
      editableInput.setAttribute('value', term.definition);
      editableInput.setAttribute('id', defId);
      editableInput.onchange = (e) => { setUpdate(e.target.value) };
      // Replace the fixed string field to an input box
      document.getElementById(defId).replaceWith(editableInput);
    } else {
      // Once click button 'Update'
      // Send POST request to server -> Server call database update function
      axios.post('/glossaryUpdate', { term: term.term, definition: update })
        .then(() => {
          // Send GET request to retrieve the updated data
          // setState() to change it
          axios.get('/glossary')
            .then((result) => {
              props.setAllTerms(result.data);
            })
            .catch((err) => {
              console.log(err);
            })
        })
      // Once click button 'Update', need change input field to fixed string field again
      var updatedInput = document.createElement("div");
      updatedInput.textContent = update;
      updatedInput.setAttribute('id', defId);
      document.getElementById(defId).replaceWith(updatedInput);
      document.getElementById(buttonID).innerHTML = 'Edit';
    }
  };

  // Delete Function
  function deleteRecord(term) {
    axios.post('/glossaryDelete', {
      term: term
    })
      .then(() => {
        axios.get('/glossary')
          .then((result) => {
            props.setAllTerms(result.data);
          })
          .catch((err) => {
            console.log(err);
          })
      })
  };

  const firstLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

  return (
    <div>
      <div>
        <input type='search' value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
        <button onClick={(e) => searchRecord(searchInput)}>Search</button>
      </div>
      <div>
        <label>
          Filter by Term First Letter:
          <select value={filterInput} onChange={(e) => setFilterInput(e.target.value)}>
            {/* <select value={filterInput} onChange={triggerFilter}> */}
            <option>Select a Filter</option>
            {firstLetters.map((firstLetter, i) => (
              <option key={i}>{firstLetter}</option>
            ))}
          </select>
        </label>
      </div>
      <table>
        <tr>
          <th>Term</th>
          <th>Definition</th>
          <th>Action</th>
        </tr>
        {props.allTerms.map((term, i) => {
          return (
            <tr key={i}>
              <td>{term.term}</td>
              <td><div id={`definition${i}`}>{term.definition}</div></td>
              <td><button id={`Edit${i}`} onClick={(e) => { editRecord(term, i) }}>Edit</button></td>
              <td><button onClick={(e) => { deleteRecord(term.term) }}>Delete</button></td>
            </tr>
          )
        })
        }
      </table>
    </div>
  )
};

export default TermList;