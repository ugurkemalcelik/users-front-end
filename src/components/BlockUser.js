import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DisplayMessage from './DisplayMessage';

const BlockUser = () => {  

  const [data,setData] = useState({
    name: "",
    email: "",
    role: "",
    title: "",
    place: "",
    blocked: "",
    website: "",
    about: ""

  });

  const [state,setState] = useState({
    message: "",
    alert: ""
  })

  const {id} = useParams();  

  const access_token = document.cookie.split("access_token=")[1]; 

  const getBlock = async () => {

    try {

      const response = await axios.put(`https://ukcbackend.up.railway.app/api/admin/block/${id}`,{},{
        headers: {
          authorization: `Bearer: ${access_token}`
        }      
      })      

      setData({
        
        name: response.data.data.name,
        email: response.data.data.email,
        role: response.data.data.role,
        title: response.data.data.title,
        place: response.data.data.place,
        blocked: response.data.data.blocked,
        website: response.data.data.website,
        about: response.data.data.about

      });      

      setState({
        message: response.data.message,
        alert: "alert alert-success mb-3 col-md-6"
      })  

    } catch (err) {
      setState({
        message: err.response.data.message,
        alert: "alert alert-danger mb-3 col-md-6"
      })  
    }    
  }

  useEffect(() => {

    getBlock();

  },[])  
  
  const {name,email,role,blocked,title,place,website,about} = data;

  return (
    <div>
      <h5 className='text-center'>Block User Page</h5>
      <DisplayMessage state={state}/>
      <div className="card col-md-6" style={{margin:"auto"}}>        
        <div className="card-header">
          <h5> {name} </h5>
        </div>
        <div className="card-body">
          <p> Email: {email} </p>
          <p> Role: {role} </p>
          <b><p> Blocked: {blocked.toString()} </p></b>
          <p> Title: {title} </p>
          <p> Place: {place} </p>
          <p> Website: {website} </p>
          <p> About: {about} </p>
        </div>
      </div>

    </div>
  )
}

export default BlockUser;
