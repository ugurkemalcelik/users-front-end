import axios from 'axios';
import React, { useState } from 'react';
import DisplayMessage from './DisplayMessage';
import {useNavigate} from "react-router-dom"

const AddQuestion = () => {

  const [form,setForm] = useState({
    title: "",
    content: ""
  });

  const [state,setState] = useState({
    message: "",
    alert: ""
  })

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })    
  }

  const {title,content} = form; 

  const navigate = useNavigate();
  

  return (
    <div >
      <h5 className='text-center'>Add Question Page</h5>
      <DisplayMessage state={state}/>
      <div className="card col-md-6" style={{margin:"auto"}}>
        <div className="card-header">
          <form onSubmit={async (e) => {

            e.preventDefault();

            const access_token = document.cookie.split("access_token=")[1];        

            const askQuestion = {
              title,
              content          
            }
            
            try {
              
              const response = await axios.post(`https://ukcbackend.up.railway.app/api/questions/add`,askQuestion,{
                headers: {
                  authorization: `Bearer: ${access_token}`
                }
              });

              

              setForm({
                title: "",
                content: ""
              })
  
              setState({
                message: response.data.message,
                alert: "alert alert-success mb-3 col-md-6"
              })   
              
              navigate("/getallquestions");

            } catch (err) {
              
              setState({
                message: err.response.data.message,
                alert: "alert alert-danger mb-3 col-md-6"
              })

              setForm({
                title: "",
                content: ""
              })

            }

          }}>
          <label htmlFor="title" className='form-label'>Title:</label>
          <input
            type="text"
            className='form-control'
            placeholder='Please provide a title'
            id='title'
            name='title'
            value={title} 
            onChange={onChangeHandler}           
          />
            <label htmlFor="content" className='form-label'>Content:</label>
            <div className="d-grid">
              <textarea 
                className='form-control'
                name="content" 
                id="content" 
                cols="20" 
                rows="5"
                placeholder='Please provide a content'
                value={content}
                onChange={onChangeHandler}
                ></textarea>
            </div> 
            <div className="d-grid">
              <input type="submit" className='btn btn-primary mt-3 mb-3' value={"Submit"}/>
            </div>  
            </form>     
        </div>        
      </div>
    </div>
  )
}

export default AddQuestion;
