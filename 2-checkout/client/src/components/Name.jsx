import { useState } from 'react';

const Name = (props) => {

  function navigateToAddress(e) {
    props.setPage('Address');
  };
  return (
    <div>
      <div>Name: <input type='String' onChange ={(e)=> props.setName(e.target.value)}/></div>
      <div>Email:<input type='String' onChange ={(e)=> props.setEmail(e.target.value)}/></div>
      <div>Password:<input type='String' onChange ={(e)=> props.setPassword(e.target.value)}/></div>
      <button onClick={navigateToAddress}>Next</button>
    </div>
  )
};

export default Name;