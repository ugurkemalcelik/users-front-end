import React, { useEffect, useReducer, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Link } from "react-router-dom";
import DisplayMessage from './DisplayMessage';

const reducer = (state,action) => {
  switch (action.type) {
    case "ADD_QUESTIONS":
      
      return {          
        ...state,
        questions: action.payload
             
      };

    case "DELETE_QUESTION":

      return {
        ...state,
        questions: state.questions.filter(question => question._id !== action.payload)
      }
  
    default:
      return;
  }

}

const GetAllQuestions = () => {

  const [state,dispatch] = useReducer(reducer,{
    questions: []
  });

  const [state1,setState1] = useState({
    message: "",
    alert: ""
  })

  const access_token = document.cookie.split("access_token=")[1];  

  const getQuestions = async () => {

    try {

      const response = await axios.get(`https://ukcbackend.up.railway.app/api/questions`,{
        headers: {
          authorization: `Bearer: ${access_token}`
        }
      });      

      dispatch({type: "ADD_QUESTIONS",payload: response.data.data});  
      
      if(response.data.data.length === 0){
        setState1({
          message: "There is no question",
          alert: "alert alert-danger mb-3 col-md-6"
        }) 
      } else {
        setState1({
        message: response.data.message,
        alert: "alert alert-success mb-3 col-md-6"
      }) 
      }


    } catch (err) {      
      
      setState1({
        message: err.response.data.message,
        alert: "alert alert-danger mb-3 col-md-6"
      }) 

    }    
    
  }  

  useEffect(() => {
    getQuestions();
  },[])

  const {questions} = state;

  const Questions = ({questions}) => {

    return (
      <div>
        <h3 className='text-center'>Get All Questions Page</h3>
        <DisplayMessage state={state1}/>
        {
          questions.map(question => {
            return (
              <Question
                key={question._id}
                id={question._id}
                title={question.title}
                content={question.content}
                createdAt={question.createdAt}
                userId={question.userId}
                questionOwnerName={question.questionOwnerName}
                answerId={question.answerId}
                likes={question.likes}
                slug={question.slug}                            
              />
            )
          })
        }
      </div>
    )
  }

  const Question = ({id,title,content,createdAt,userId,questionOwnerName,answerId,likes,slug}) => {    
      
    const [state1,setState1] = useState({
      message: "",
      alert: ""
    })

    return (
      <div>  
        <DisplayMessage state={state1}/>      
        <div className="card col-md-6 mb-3" style={{margin:"auto"}}>
            <div className="card-header d-flex justify-content-between">
                <h5>{title}</h5>
                <FontAwesomeIcon icon={faTrash} style={{cursor:"pointer"}} onClick={async (e) => {

                  const access_token = document.cookie.split("access_token=")[1];

                  try {                    

                    const response = await axios.delete(`https://ukcbackend.up.railway.app/api/questions/delete/${id}`,{
                      headers: {
                        authorization: `Bearer: ${access_token}`
                      }
                    })
                        
                    dispatch({type: "DELETE_QUESTION",payload: id})                 
                    
                  } catch (err) {                   
                    
                    setState1({
                      message: err.response.data.message,
                      alert: "alert alert-danger mb-3 col-md-6"
                    }) 
                  }                  

                }}/>
            </div>
            <div className="card-body">
              <p><b>Question Id:</b> {id}</p>
              <p><b>CreatedAt:</b> {createdAt}</p>
              <p><b>Question Owner Id:</b> {userId}</p> 
              <p><b>Question Owner Name:</b> {questionOwnerName}</p>             
              <p><b>Answer Id:</b> {
                answerId.map(answer => `[${answer}], `)
              }</p>
              <p><b>Likes:</b> {
                likes.map(like => `[${like}] ,`)
              }</p>
              <p><b>Slug:</b> {slug}</p>   
              <p><b>Content:</b> {content}</p>           
              <div className="d-grid">
                <Link to={`/editquestion/${id}`} className='btn btn-primary'>Edit Question</Link>
              </div>   
              <div className="d-grid">
                <Link to={`/likequestion/${id}`} className='btn btn-success mt-2'>Like Question</Link>
              </div>   
              <div className="d-grid">
                <Link to={`/undolikequestion/${id}`} className='btn btn-danger mt-2'>Undolike Question</Link>
              </div>  
              <div className="d-grid">
                <Link to={`/${id}/addanswer/`} className='btn btn-warning mt-2'>Add Answer</Link>
              </div> 
              <div className="d-grid">
                <Link to={`/${id}/getallanswers/`} className='btn btn-secondary mt-2'>Get All Answers To This Question</Link>
              </div> 
            </div>
        </div>
      </div>
    )
  }
  
  return (
    <div>
      <Questions questions={questions}/>      
    </div>
  )
}

export default GetAllQuestions;
