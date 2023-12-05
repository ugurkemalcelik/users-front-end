import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import DisplayMessage from './DisplayMessage';

const GetSingleUser = () => {  

  const {id} = useParams();

  const [user,setUser] = useState({

    name: "",
    email: "",
    role: "",
    title: "",
    place: "",
    website: "",
    about: ""

  })

  const [state,setState] = useState({
    message: "",
    alert: ""
  })
  
  const onClickMethod = async () => { 
    
    try {

      const response = await axios.get(`https://ukcbackend.up.railway.app/api/users/${id}`);

      setUser({
        ...user,
        name: response.data.data.name,
        email: response.data.data.email, 
        role: response.data.data.role,
        title: response.data.data.title,
        place: response.data.data.place,
        website: response.data.data.website,
        about: response.data.data.about
      }) 

      setState({
        message: "The User is achieved sussessfully",
        alert: "alert alert-success mb-3 col-md-6"
      })  

    } catch (err) {

      setState({
        message: err.response.data.message,
        alert: "alert alert-danger mb-3 col-md-6"
      }) 
      
    }

   

  }
  
  const {name,email,role,title,place,website,about} = user;
  

  
  
  return (

    <div>
      <h3 className='text-center'>Get Single User Page</h3>      
      <h5 className='text-center mb-5'>Please Provide Id Number of Person That Is Wanted To Display Into The URL Then Press Display Button</h5>
      <DisplayMessage state={state}/>
      <div className="card col-md-6" style={{margin: "auto"}}>
        <div className="card-header">
          <h6>Name: {name} </h6>
        </div>
        <div className="card-body">
          <p>Email: {email} </p>
          <p>Role: {role} </p>
          <p>Title: {title} </p>
          <p>Place: {place} </p>
          <p>Website: {website} </p>
          <p>About: {about} </p>
          <div className="d-grid">
            <input type="button" className='btn btn-primary mt-4' value={"Display User"} onClick={onClickMethod}/> 
          </div>
        </div>      
      </div>
    </div>
  )
}

export default GetSingleUser;
