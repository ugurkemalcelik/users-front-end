import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DisplayMessage from './DisplayMessage';

const UndolikeQuestion = () => {

  const {id} = useParams();

  const [state1,setState1] = useState({
    message: "",
    alert: ""
  });

  const getLike = async () => {

    try {       
      
      const access_token = document.cookie.split("access_token=")[1];
      
      const response = await axios.put(`https://ukcbackend.up.railway.app/api/questions/undolike/${id}`,null,{
        headers: {
          authorization: `Bearer: ${access_token}`
        }
      })      

      setState1({
        message: response.data.message,
        alert: "alert alert-success mb-3 col-md-6"
      })

    } catch (err) {      
      
      setState1({
        message: err.response.data.message,
        alert: "alert alert-danger mb-3 col-md-6"
      })

    }
  }

  useEffect(() => {
    getLike();
  },[])

  return (
    <div>
      <h5 className='text-center'>Like Question Page</h5>
      <DisplayMessage state={state1}/>
    </div>
  )
}

export default UndolikeQuestion;
