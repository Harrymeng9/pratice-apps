import { useState } from 'react';
const axios = require('axios');

const Confirmation = (props) => {

  function navigateToHome(e) {
    props.setPage('Home');
    axios.post('/checkout', {
      name: props.name, email: props.email, password: props.password, addressLine1: props.addressLine1,
      addressLine2: props.addressLine2, city: props.city, state: props.state, zipCode: props.zipCode, phoneNumber: props.phoneNumber,
      cardNumber: props.cardNumber, expiryDate: props.expiryDate, cvv: props.cvv, billingZipCode: props.billingZipCode
    })
      .then((result) => {
        //
        console.log('result', result);

      })
      .catch((err) => {
        console.log(err);
      })
  };

  return (
    <div>
      <h3>Customer Info</h3>
      <div>Name: {props.name}</div>
      <div>Email: {props.email}</div>
      <div>Password: {props.password}</div>
      <br></br>

      <h3>Address & Phone#</h3>
      <div>Address Line 1: {props.addressLine1}</div>
      <div>Address Line 2: {props.addressLine2}</div>
      <div>City: {props.city}</div>
      <div>State: {props.state}</div>
      <div>Zip Code: {props.zipCode}</div>
      <div>Phone Number: {props.phoneNumber}</div>
      <br></br>

      <h3>Credit Card</h3>
      <div>Credit Card#: {props.cardNumber}</div>
      <div>Expiry Date: {props.expiryDate}</div>
      <div>CVV: {props.cvv}</div>
      <div>Billing Zip Code: {props.billingZipCode}</div>
      <br></br>

      <button onClick={navigateToHome}>Purchase</button>
    </div>
  )
};

export default Confirmation;