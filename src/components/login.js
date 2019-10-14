import React from 'react';
import { Link } from "react-router-dom";
import Auth from './auth.js';

export default function Login(props) {

  function loginUser(event){    
    event.preventDefault();    
    Auth.authenticate(event.target['username'].value, event.target['password'].value)
      .then(result =>
        {
          props.loginSucces();
          props.history.push("/payment");
        })
      .catch(() => {
        props.loginFail();
      }) 
  }

    return (
    	<form method="POST" className="loginForm" onSubmit={loginUser}>
    	  <input type="text" name="username" placeholder="Username" />
        <input type="password" name="password" placeholder="Password" />
        <Link to="/" className="lnk">Back</Link>
        <button type="submit">Login</button>
      </form>       
    );
}