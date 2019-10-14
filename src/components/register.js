import React from 'react';
import { Link } from "react-router-dom";
import createUser from "./createUser.js";

export default function Register(props) {

  function createUsers(event){
    event.preventDefault();    
    createUser.adding(event.target['username'].value, event.target['password'].value)
      .then(result =>
        {
          console.log("succes");
        })
      .catch(() => {
        console.log('Fail');
      }) 
  }

    return (
      <form method="POST" className="registerForm" onSubmit={createUsers}>
        <input type="text" name="username" placeholder="Username" />
        <input type="password" name="password" placeholder="Password" />
        <Link to="/" className="lnk">Back</Link>
        <button type="submit">Register</button>
      </form>      
    );
}