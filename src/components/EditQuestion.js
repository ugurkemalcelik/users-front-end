import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {useParams} from "react-router-dom";
import DisplayMessage from './DisplayMessage';
import {useNavigate} from "react-router-dom";

const EditQuestion = () => {

  const {id} = useParams();

  const [form,setForm] = useState({
    title: "",
    content: ""
  })

  const [state,setState] = useState({
    message: "",
    alert: ""
  });

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })    
  }

  const access_token = document.cookie.split("access_token=")[1];

  const getQuestion = async () => {

    try {
      
      const response = await axios.get(`https://ukcbackend.up.railway.app/api/questions/${id}`);

      setForm({
        ...form,
        title: response.data.data.title,
        content: response.data.data.content
      })

      setState({
        message: response.data.message,
        alert: "alert alert-success mb-3 col-md-6"
      })     

    } catch (err) {
      
      setState({
        message: err.response.message,
        alert: "alert alert-danger mb-3 col-md-6"
      })

    }
  }

  useEffect(() => {

    getQuestion()

  },[])

  const {title,content} = form;  

  const navigate = useNavigate();

  return (
    <div >
      <h4 className='text-center'>Edit Question Page</h4>  
      <DisplayMessage state={state}/>    
      <div className="card col-md-6" style={{margin:"auto"}}>
        <div className="card-header">
            <form onSubmit={async (e) => {

              e.preventDefault();

              const editedQuestion = {
                title,
                content
              }              

              try {
                
                const response = await axios.put(`https://ukcbackend.up.railway.app/api//questions/edit/${id}`,editedQuestion,{
                  headers: {
                    authorization: `Bearer: ${access_token}`
                  }
                })                

                setForm({
                  ...form,
                  title: response.data.data.title,
                  content: response.data.data.content
                })

                navigate("/getallquestions");

              } catch (err) {                
                
                setState({
                  message: err.response.data.message,
                  alert: "alert alert-danger mb-3 col-md-6"
                })
              }


            }}>
              <label htmlFor="title" className='form-label'>Title:</label>
              <input
                type="text"
                className='form-control'
                placeholder='Please provide a new title'
                id='title'
                name='title'
                value={title}   
                onChange={onChangeHandler}         
              />
              <label htmlFor="content" className='form-label'>Content:</label>
              <textarea
                name="content"
                id="content"
                cols="10" 
                rows="5" 
                placeholder='Please provide a new content'
                className='form-control' 
                value={content}
                onChange={onChangeHandler}        
              ></textarea>
                <div className="d-grid">
                  <input type="submit" className='btn btn-primary mt-3 mb-2' value={"Submit"}  />
                </div>
            </form>
        </div>
      </div>
    </div>
  )
}

export default EditQuestion;
