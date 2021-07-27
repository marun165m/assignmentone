
import { Redirect,Link } from "react-router-dom";

import React, {useState}from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm } from "react-hook-form";
export default function Add() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [render,setRender]=useState(false)
  const onSubmit =(data)=>{
    console.log(data);
    let datastr = JSON.parse(localStorage.getItem("arrayodData"));
    let newinstance={"user": {
                    gender: data.gender,
                    name:{
                      "title":data.title,
                      "first": data.firstName,
                      "last": data.lastName
                    },
                    email: data.email,
                    password: data.password,
                    dob: data.dob,
                    picture:{
                      large: data.picture,

                    }
 
    }
  };
  datastr.push(newinstance);
  console.log("datastr",datastr);
  localStorage.setItem("arrayodData", JSON.stringify(datastr));

    setRender(true);
  }
  const checkLength=(value)=>value.length>6;
  return render?(<Redirect to="/users"/>):(


    <div style={{ display: 'block', 
                  width: 700, 
                  padding: 30 }}>

        <Link className="btn btn-primary" to="/users">back to users</Link>
        <div className="card m-3">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-row">
                        <div className="form-group col">
                            <label>Title</label>
                            <select name="title" {...register('title',{required:"true"})} className={`form-control ${errors.title ? 'is-invalid' : ''}`}>
                                <option value=""></option>
                                <option value="Mr">Mr</option>
                                <option value="Mrs">Mrs</option>
                                <option value="Miss">Miss</option>
                                <option value="Ms">Ms</option>
                            </select>
                        </div>
                        <div className="form-group col-5">
                            <label>First Name</label>
                            <input name="firstName" type="text" {...register('firstName',{required:"true"})} className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} />
                        </div>
                        <div className="form-group col-5">
                            <label>Last Name</label>
                            <input name="lastName" type="text" {...register('lastName' ,{required:"true"})} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} />
                        </div>
                    </div>
                    <div className="form-group col">
                            <label>gender</label>
                            <select name="gender" {...register('gender',{required:"true"})} className={`form-control ${errors.title ? 'is-invalid' : ''}`}>
                                <option value="male">male</option>
                                <option value="female">female</option>
                                <option value="other">other</option>
                            </select>
                        </div>
                    <div className="form-row">
                        <div className="form-group col">
                            <label>Date of Birth</label>
                            <input name="dob" type="date" {...register('dob',{required:"true"})} className={`form-control ${errors.dob ? 'is-invalid' : ''}`} />
                        </div>
                        <div className="form-group col">
                            <label>Email</label>
                            <input name="email" type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                        </div>
                        <div className="form-group col">
                            <label>picture</label>
                            <input name="picture" type="text" {...register('picture')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col">
                            <label>Password</label>
                            <input name="password" type="password" {...register('password',{required:"true",validate:{
                                checkLength: checkLength,

                            }})} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                           <p style={{color:"red"}}>{errors.password&&errors.password.type}</p> 
                        </div>

                    </div>

                    <div className="form-group">
                        <button type="submit" className="btn btn-primary mr-1">Add</button>
                    </div>
                </form>
        </div>
    </div>
  );
}