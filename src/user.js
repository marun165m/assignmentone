/** @format */

import { Button, Card, CardGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

import React, { Component, useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
function User() {
  let initial = JSON.parse(localStorage.getItem("arrayodData"))||"";

  const [search, setsearch] = useState("");
 const [datastore,setdatastore]=useState(initial);
  useEffect(() => {
    fetch("https://randomuser.me/api/0.8/?results=20")
      .then((res) => res.json())
      .then((result) => {
        console.log(result.results);
        localStorage.setItem("arrayodData", JSON.stringify(result["results"]));

      });
  }, []);
  let datastr = JSON.parse(localStorage.getItem("arrayodData"));
  useEffect(() => {
    setdatastore(datastr);

  }, []);
  const onClickdelete=(ind)=>{
console.log("bdy");
  let datastoretemp=datastore.filter((value,index)=>{
    if(value.user.name.first!==ind){
      return value;
    }
  });
  setdatastore(datastoretemp);

  localStorage.setItem("arrayodData", JSON.stringify(datastoretemp));
  
};
  return (
    <div>
      <Link to='/user/add' >Add user</Link>
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
          datastore.map((item, index) => {
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
                      <small className='text-muted'>
                        {item.user.email}

                      </small>
                    </Card.Footer>
                    <Card.Footer>

                        <button
                        onClick={()=>onClickdelete(item.user.name.first)}
                          type='button'
                          className='btn btn-primary btn-block'>
                          delete
                        </button>
                    </Card.Footer>
                  </Card>
                </div>
              );
            }
          })}
      </CardGroup>
    </div>
  );
}

export default User;
