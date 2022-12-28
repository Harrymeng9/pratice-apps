import { React, useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import { render } from "react-dom";
// import {useState} from 'react';
import Name from './components/Name.jsx';
import Address from './components/Address.jsx';
import Card from './components/Card.jsx';
import Confirmation from './components/Confirmation.jsx';

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
  const [billingZip, setBillingZip] = useState('');

  function navigateToF1(e) {
    setPage('Name');
  };

  if (page === 'Home') {
    return (
      <div>
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
        <Card setPage={setPage} setCardNumber={setCardNumber} setExpiryDate={setExpiryDate} setCvv={setCvv} setBillingZip={setBillingZip} />
      </div>
    )
  } else if (page === 'Confirmation') {
    return (
      <div>
        <h1>Step 5</h1>
        <Confirmation setPage={setPage} name={name} email={email} password={password} addressLine1={addressLine1}
          addressLine2={addressLine2} city={city} state={state} zipCode={zipCode} phoneNumber={phoneNumber}
          cardNumber={cardNumber} expiryDate={expiryDate} cvv={cvv} billingZip={billingZip} />
      </div>
    )
  }
}

ReactDOM.render(<Root />, document.getElementById('root'));

// render(
//   <div>
//     <p>Hello, World!</p>
//     <p>
//       <code>Page Cookie: {JSON.stringify(document.cookie, undefined, "\t")}</code>
//     </p>
//   </div>,
//   document.getElementById("root")
// );


// return (
//   <div>
//   <p>Hello, World!</p>
//   <p>
//     <code>Page Cookie: {JSON.stringify(document.cookie, undefined, "\t")}</code>
//   </p>
//   <button onClick = {navigateToF1}>Check Out</button>
// </div>
// )