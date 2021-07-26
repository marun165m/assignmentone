import React, { Component , useState} from "react";
import { Redirect, useHistory,Route } from "react-router-dom";
import {data} from './data';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import User from './user'
 function Login()  {
   
   

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let hist=useHistory();

  
    function handleSubmit(event) {
      event.preventDefault();
      if ((email === data.user) && (password === data.pwd)) {
        hist.push("/users");
        }
    }   
    
    
        return (
            <form onSubmit={(event)=>handleSubmit(event)} >
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" className="form-control"  />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" className="form-control"  />
                </div>



                <button  type="submit" className="btn btn-primary btn-block">Submit</button>

            </form>
        );
    
}
export default Login;