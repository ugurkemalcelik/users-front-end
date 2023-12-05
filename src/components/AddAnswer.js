import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import DisplayMessage from './DisplayMessage';
import {useNavigate} from "react-router-dom";


const AddAnswer = () => {

  const {id} = useParams();

  const question_id = id; 

  const [form,setForm] = useState({
    content: ""
  })

  const [state,setState] = useState({
    message: "",
    alert: ""
  });

  const onChangedHandler = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    }) 

  }

  const {content} = form;

  const navigate = useNavigate();

   return (
    <div >
      <h5 className='text-center'>Add Answer Page</h5>
      <DisplayMessage state={state}/>
      <div className="card col-md-6" style={{margin:"auto"}}>
        <div className="card-header">
          <form onSubmit={async (e) => {

            e.preventDefault();

            const access_token = document.cookie.split("access_token=")[1];

            const newAnswer = {
              content
            }

            try {
              
              const response = await axios.post(`https://ukcbackend.up.railway.app/api/questions/${question_id}/answers/add`,newAnswer,{
                headers: {
                  authorization: `Bearer: ${access_token}`
                }                
              })          

              setState({
                message: response.data.message,
                alert: "alert alert-success mb-3 col-md-6"
              }) 

              setForm({
                content: ""
              })

              navigate("/getallquestions");

            } catch (err) {
              
              setState({
                message: err.response.data.message,
                alert: "alert alert-danger mb-3 col-md-6"
              }) 

            }

          }}>
            <label htmlFor="content" className='form-label'> Content: </label>
            <input
               type="text"
               id='content'
               className='form-control'
               placeholder='Please provide a content'
               name='content'
               value={content}
               onChange={onChangedHandler}
            />
            <div className="d-grid">
              <input type="submit" className='btn btn-primary mt-3 mb-2' value={"Submit"} />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddAnswer;
