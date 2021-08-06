/** @format */
import { useForm } from "react-hook-form";

import { Button, Card, CardGroup ,Modal} from "react-bootstrap";
import { Link } from "react-router-dom";
import Add from '../addUser/add'
import React, { Component, useState, useEffect } from "react";
// import "./App.css";

function User() {
  let initial = JSON.parse(localStorage.getItem("arrayodData")) || "";
  const [search, setsearch] = useState("");
  const [datastore, setdatastore] = useState(initial);
  console.log(datastore);

  useEffect(() => {
    fetch("https://randomuser.me/api/0.8/?results=20")
      .then((res) => res.json())
      .then((result) => {
        console.log(result.results);
        if((!JSON.parse(localStorage.getItem("arrayodData")))||(datastore=="")){
          localStorage.setItem("arrayodData", JSON.stringify(result["results"]));
          setdatastore(JSON.parse(localStorage.getItem("arrayodData")));
        }

      });
  },[]);
  console.log(datastore);

  // let datastr = JSON.parse(localStorage.getItem("arrayodData"));
  // useEffect(() => {
  //   setdatastore(datastr);
  // }, []);
  const onClickdelete = (ind) => {
    console.log("bdy");
    let datastoretemp = datastore.filter((value, index) => {
      if (value.user.name.first !== ind) {
        return value;
      }
    });
    setdatastore(datastoretemp);

    localStorage.setItem("arrayodData", JSON.stringify(datastoretemp));
  };
  const [item, setItem] = useState(null);
  const [index, setIndex] = useState(null);

  const [editView, setEditView] = useState(false);
  const handleEdit = (iteml,index) => {
    setEditView(true);
    setItem(iteml);
    setIndex(index);
  };
  return !editView ? (
    <div>
      <Link to='/user/add'>Add user</Link>
      <div className='form-group'>
        <label>Search</label>
        <input
          onChange={(e) => setsearch(e.target.value)}
          value={search}
          type='text'
          className='form-control'
        />
      </div>
      <CardGroup>
        {datastore &&
          datastore.map((item, index, array) => {
            let pool = item.user.name.first.toUpperCase();
            let searchd = search.toUpperCase();
            if (search === "" || pool.indexOf(searchd) > -1) {
              return (
                <div style={{ margin: "10px" }}>
                  <Card key={index}>
                    <Card.Img variant='top' src={item.user.picture.large} />
                    <Card.Body>
                      <Card.Title> {item.user.name.first}</Card.Title>
                      <Card.Text>{item.user.phone}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <small className='text-muted'>{item.user.email}</small>
                    </Card.Footer>
                    <Card.Footer>

                      <Example index={item.user.name.first} onClickdelete={(index)=>{onClickdelete(index);}}/>


                      <button
                        className='delete button'
                        onClick={()=>handleEdit(item,index)}>
                        edit
                      </button>
                    </Card.Footer>
                  </Card>
                </div>
              );
            }
          })}
      </CardGroup>
    </div>
  ) : (
    <Add item={item} index={index} setEdit={setEditView} />
  );
}

export default User;

function EditView(props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const checkLength = (value) => value.length > 6;
  const onSubmit = (data) => {
    console.log(data);
    let datastr = JSON.parse(localStorage.getItem("arrayodData"));
    let newinstance = props.item;
    newinstance.user.gender= data.gender;
    newinstance.user.name.title= data.title;
    newinstance.user.name.first= data.firstName;
    newinstance.user.name.last =data.lastName;
    newinstance.user.email =data.email;
    newinstance.user.password =data.password;
    newinstance.user.dob =data.dob;
    newinstance.user.picture.large =data.picture;
  datastr.splice(props.index,1,newinstance);
  localStorage.setItem("arrayodData", JSON.stringify(datastr));

    // setRender(true);
  };
  console.log(props);
  let title = props.item?.user?.name?.title;
  let first = props.item?.user?.name?.first;
  let last = props.item?.user?.name?.last;
  let dob = props.item?.user?.dob;
  let email = props.item?.user?.email;
  let large = props.item?.user?.picture?.large;
  return (
    <div style={{ display: "block", width: 700, padding: 30 }}>
      <button
        className='btn btn-primary'
        onClick={() => {
          props.setEdit(false);
        }}>
        back to users
      </button>
      <div className='card m-3'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='form-row'>
            <div className='form-group col'>
              <label>Title</label>
              <select
                selected={title}
                name='title'
                {...register("title", { required: "true" })}
                className={`form-control ${errors.title ? "is-invalid" : ""}`}>
                <option value=''></option>
                <option value='Mr'>Mr</option>
                <option value='Mrs'>Mrs</option>
                <option value='Miss'>Miss</option>
                <option value='Ms'>Ms</option>
              </select>
            </div>
            <div className='form-group col-5'>
              <label>First Name</label>
              <input
                onChange={(e) => (first = e.target.value)}
                placeholder={first}
                name='firstName'
                type='text'
                {...register("firstName", { required: "true" })}
                className={`form-control `}
              />
            </div>
            <div className='form-group col-5'>
              <label>Last Name</label>
              <input
                onChange={(e) => (last = e.target.value)}
                placeholder={last}
                name='lastName'
                type='text'
                {...register("lastName", { required: "true" })}
                className={`form-control ${
                  errors.lastName ? "is-invalid" : ""
                }`}
              />
            </div>
          </div>
          <div className='form-group col'>
            <label>gender</label>
            <select
              selected={props.item?.user?.gender}
              name='gender'
              {...register("gender", { required: "true" })}
              className={`form-control ${errors.title ? "is-invalid" : ""}`}>
              <option value='male'>male</option>
              <option value='female'>female</option>
              <option value='other'>other</option>
            </select>
          </div>
          <div className='form-row'>
            <div className='form-group col'>
              <label>Date of Birth</label>
              <input
                onChange={(e) => (dob = e.target.value)}
                placeholder={dob}
                name='dob'
                type='date'
                {...register("dob", { required: "true" })}
                className={`form-control ${errors.dob ? "is-invalid" : ""}`}
              />
            </div>
            <div className='form-group col'>
              <label>Email</label>
              <input
                onChange={(e) => (email = e.target.value)}
                placeholder={email}
                name='email'
                type='text'
                {...register("email")}
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
              />
            </div>
            <div className='form-group col'>
              <label>picture</label>
              <input
                onChange={(e) => (large = e.target.value)}
                placeholder={large}
                name='picture'
                type='text'
                {...register("picture")}
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
              />
            </div>
          </div>
          <div className='form-row'>
            <div className='form-group col'>
              <label>Password</label>
              <input
                name='password'
                type='password'
                {...register("password", {
                  required: "true",
                  validate: {
                    checkLength: checkLength,
                  },
                })}
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
              />
              <p style={{ color: "red" }}>
                {errors.password && errors.password.type}
              </p>
            </div>
          </div>

          <div className='form-group'>
            <button type='submit' className='btn btn-primary mr-1'>
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
function Example(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 const handleDelete=()=>{
   console.log("props.inex",props.index)
  props.onClickdelete(props.index); 
  handleClose();
 }
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        do you want to delete?
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>delete?</Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Delete?
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}