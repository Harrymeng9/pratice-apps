import { useState } from 'react';

const Card = (props) => {

  function navigateToConfirmation(e) {
    props.setPage('Confirmation');
  };

  return (
    <div>
      <div>Credit Card#: <input type='String' onChange={(e) => props.setCardNumber(e.target.value)}/></div>
      <div>Expiry date:<input type='String' onChange={(e) => props.setExpiryDate(e.target.value)}/></div>
      <div>CVV:<input type='String' onChange={(e) => props.setCvv(e.target.value)}/></div>
      <div>Billing Zip Code:<input type='String' onChange={(e) => props.setBillingZip(e.target.value)}/></div>
      <button onClick={navigateToConfirmation}>Next</button>
    </div>
  )
};

export default Card;