import { useState } from 'react';

const Address = (props) => {

  function navigateToCard(e) {
    props.setPage('Card');
  };

  return (
    <div>
      <div>Address Line 1: <input type='String' onChange={(e) => props.setAddressLine1(e.target.value)} /></div>
      <div>Address Line 2:<input type='String' onChange={(e) => props.setAddressLine2(e.target.value)} /></div>
      <div>City:<input type='String' onChange={(e) => props.setCity(e.target.value)} /></div>
      <div>State:<input type='String' onChange={(e) => props.setState(e.target.value)} /></div>
      <div>Zip Code:<input type='String' onChange={(e) => props.setZipCode(e.target.value)} /></div>
      <div>Phone Number:<input type='String' onChange={(e) => props.setPhoneNumber(e.target.value)} /></div>
      <button onClick={navigateToCard}>Next</button>
    </div>
  )

};

export default Address;