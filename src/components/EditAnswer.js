import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DisplayMessage from './DisplayMessage';
import {useNavigate} from "react-router-dom"

const EditAnswer = () => {

  const {id,questionId} = useParams();

  const [state,setState] = useState({
    message: "",
    alert: ""
  })

  const [form,setForm] = useState({
    content: ""
  })

  const answer_id = id;
  const question_id = questionId; 

  const access_token = document.cookie.split("access_token=")[1];

  const getAnswer = async () => {

    try {

      const response = await axios.get(`https://ukcbackend.up.railway.app/api/questions/${question_id}/answers/${answer_id}`,{
        headers: {
          authorization: `Bearer: ${access_token}`
        }
      })

      setForm({
          content: response.data.data.content
      })
      
    } catch (err) {      

      setState({
        message: err.response.data.message,
        alert: "alert alert-danger mb-3 col-md-6"
      })

    }
  }

  useEffect(() => {
    getAnswer();
  },[])

  const onChangeHandler = (e) => {
      setForm({
        ...form,
        [e.target.name]: e.target.value
      })      
  }

  const {content} = form;

  const navigate = useNavigate();

  return (
    <div>
      <h5 className='text-center'>Edit Answer Page</h5>
      <DisplayMessage state={state}/>
      <div className="card col-md-6" style={{margin: "auto"}}>
        <div className="card-header">
            <form onSubmit={async (e) => {

                e.preventDefault();

                const access_token = document.cookie.split("access_token=")[1];

                const editedAnswer = {
                  content
                }              

                try {
                  
                  const response = await axios.put(`https://ukcbackend.up.railway.app/api/questions/${question_id}/answers/edit/${answer_id}`,editedAnswer,{
                      headers: {
                        authorization: `Bearer: ${access_token}`
                      }
                  })

                  setForm({
                    content: ""
                  })

                  navigate(`/${question_id}/getallanswers`)


                } catch (err) {                  
                  
                  setState({                    
                    message: err.response.data.message,
                    alert: "alert alert-danger mb-3 col-md-6"
                  })

                }

            }}>
                <label htmlFor="content" className='form-label'>Content:</label>
                <input
                 type="text"
                 id='content'
                 className='form-control'
                 placeholder='Please provide a content'
                 name='content'
                 value={content}
                 onChange={onChangeHandler}
                />
                <div className="d-grid">
                  <input type="submit" className='btn btn-primary mt-3 mb-2' value={"Submit"}/>
                </div>
            </form>
          
        </div>
      </div>
    </div>
  )
}

export default EditAnswer;
