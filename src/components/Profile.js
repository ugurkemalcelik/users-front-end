import React, { useEffect, useState } from 'react';
import axios from "axios";
import DisplayMessage from './DisplayMessage';


const Profile = () => {

  const [data,setData] = useState({});

  const [state,setState] = useState({
    message: "",
    alert: ""
  })

  const access_token = document.cookie.split("access_token=")[1]; 

  const getUser = async () => {

    try {

      const response = await axios.get("https://ukcbackend.up.railway.app/api/auth/profile",{
        headers: {
          authorization: `Bearer: ${access_token}`
        }        
      })

      setData(response.data.data);  
      
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

    getUser();

  },[])

  return (
    <div>
      <h3 className='text-center'>Profile Page</h3>
        <DisplayMessage state={state}/>
      <div className="card col-md-6"  style={{margin:"auto"}}>
        <div className="card-header">
          <h5>Logging User Informations:</h5>
        </div>   

        <div className="card-header">
          <p><b>Name</b>: {data.name} </p>
          <p><b>Email:</b> {data.email} </p>
          <p><b>Role:</b> {data.role} </p>
          <p><b>Title:</b> {data.title} </p>
          <p><b>Place:</b> {data.place} </p>
          <p><b>Website:</b> {data.website} </p>
          <p><b>About:</b> {data.about} </p>
                                       
        </div>
        

      </div>

    </div>
  )
}

export default Profile;
