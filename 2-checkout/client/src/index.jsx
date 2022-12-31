import { React, useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import { render } from "react-dom";
// import {useState} from 'react';
import Name from './components/Name.jsx';
import Address from './components/Address.jsx';
import Card from './components/Card.jsx';
import Confirmation from './components/Confirmation.jsx';
const axios = require('axios');

const Root = (props) => {

  const [page, setPage] = useState('Home');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [billingZipCode, setBillingZipCode] = useState('');

  function navigateToF1(e) {
    // Since a user can only submit the form once per session, need check whether he already checked out or now
    // document.cookie = "s_id=1001e5ea-4d55-41ab-8de2-3e3ca1f7abcd"
    // document.cookie.slice(5) = 1001e5ea-4d55-41ab-8de2-3e3ca1f7abcd
    axios.get('/checkout', { params: { sessionID: document.cookie.slice(5)} })
      .then((result) => {
        // If the sessionId exists in database, which means customer already checked out
        if (result.data) {
          alert('You already checked out!');
        } else {
          // Else move on to the next check out page
          setPage('Name');
        }
      })
  };

  if (page === 'Home') {
    return (
      <div>
        <h1>Check Out</h1>
        <h1>Step 1</h1>
        <p>
          <code>Page Cookie: {JSON.stringify(document.cookie, undefined, "\t")}</code>
        </p>
        <button onClick={navigateToF1}>Check Out</button>
      </div>
    )
  } else if (page === 'Name') {
    return (
      <div>
        <h1>Step 2</h1>
        <Name name={name} setPage={setPage} setName={setName} setEmail={setEmail} setPassword={setPassword} />
      </div>
    )
  } else if (page === 'Address') {
    return (
      <div>
        <h1>Step 3</h1>
        <Address setPage={setPage} setAddressLine1={setAddressLine1} setAddressLine2={setAddressLine2}
          setCity={setCity} setState={setState} setZipCode={setZipCode} setPhoneNumber={setPhoneNumber} />
      </div>
    )
  } else if (page === 'Card') {
    return (
      <div>
        <h1>Step 4</h1>
        <Card setPage={setPage} setCardNumber={setCardNumber} setExpiryDate={setExpiryDate} setCvv={setCvv} setBillingZipCode={setBillingZipCode} />
      </div>
    )
  } else if (page === 'Confirmation') {
    return (
      <div>
        <h1>Step 5</h1>
        <Confirmation setPage={setPage} name={name} email={email} password={password} addressLine1={addressLine1}
          addressLine2={addressLine2} city={city} state={state} zipCode={zipCode} phoneNumber={phoneNumber}
          cardNumber={cardNumber} expiryDate={expiryDate} cvv={cvv} billingZipCode={billingZipCode} />
      </div>
    )
  }
}

ReactDOM.render(<Root />, document.getElementById('root'));