import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DisplayMessage from './DisplayMessage';

const UndolikeAnswer = () => {

  const [state,setState] = useState({
    message: "",
    alert: ""
  })

  const {questionId,id} = useParams();

  const question_id = questionId;

  const answer_id = id;

  const access_token = document.cookie.split("access_token=")[1];

  const addUndolike = async () => {

    try {      

      const response = await axios.put(`https://ukcbackend.up.railway.app/api/questions/${question_id}/answers/undolike/${answer_id}`,{},{
        headers: {
          authorization: `Bearer: ${access_token}`
        }
      })

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

    addUndolike();

  },[])

  return (
    <div >
      <h5 className='text-center'>Undolike Answer Page</h5>
      <DisplayMessage state={state}/>
    </div>
  )
}

export default UndolikeAnswer;
