import axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import DisplayMessage from './DisplayMessage';

const reducer = (state,action) => {
  switch (action.type) {
    case "ADD_ANSWERS":
      
      return {
        ...state,
        answers: action.payload
      };
    
      case "DELETE_ANSWER":

      return {
        ...state,
        answers: state.answers.filter(answer => answer._id !== action.payload)
      }
  
    default:
      return state;
  }
}

const GetAllAnswersToQuestion = () => {

  const {id} = useParams();

  const question_id = id;

  const [state1,setState1] = useState({
    message: "",
    alert: ""
  })

  const [state,dispatch] = useReducer(reducer,{
    answers: []
  })

  const access_token = document.cookie.split("access_token=")[1];

  const getAnswers = async () => {
    try {
      
      const response = await axios.get(`https://ukcbackend.up.railway.app/api/questions/${id}/answers`,{
        headers: {
          authorization: `Bearer: ${access_token}`
        }
      });      

      dispatch({type:"ADD_ANSWERS", payload: response.data.data});

      if(response.data.data.length === 0){
        setState1({
          message: "There is no answer to this question",
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

    getAnswers()

  },[])

  const {answers} = state;

  const Answers = ({answers}) => {

    console.log(answers)
    
    return (
      <div>
        <h5 className='text-center'>Get All Answers To Question Page</h5>
        <DisplayMessage state={state1}/>
        {
          answers.map(answer => {
            return (
              <Answer
                key={answer._id}
                id={answer._id}
                userId={answer.userId}
                content={answer.content}
                questionId={answer.questionId}
                answerOwnerName={answer.answerOwnerName}
                likes={answer.likes}
              />
            )
          })
        }
      </div>
    )
  }

  const Answer = ({id,content,questionId,likes,userId,answerOwnerName}) => {

    
    return (
      <div>          
          <div className="card col-md-6 mb-3" style={{margin:"auto"}}>            
            <div className="card-header d-flex justify-content-between">
              <h5> {content} </h5>
              <FontAwesomeIcon icon={faTrash} style={{cursor: "pointer"}} onClick={async (e) => {    
                
                try {

                    const response = await axios.delete(`https://ukcbackend.up.railway.app/api/questions/${questionId}/answers/delete/${id}`,{
                    headers: {
                      authorization: `Bearer: ${access_token}`
                    }
                  });

                  dispatch({type: "DELETE_ANSWER",payload: id});

                } catch (err) {
                  
                  setState1({
                    message: err.response.data.message,
                    alert: "alert alert-danger mb-3 col-md-6"
                  }) 

                }

              }}/>
            </div>
            <div className="card-body">
              <p><b>Id:</b> {id}</p>
              <p><b>Answer Owner Id:</b> {userId}</p>
              <p><b>Answer Owner Name:</b> {answerOwnerName} </p>

              <p><b>Question Id:</b> {questionId}</p>
              <p><b>Like:</b> {
                likes.map(like => `[${like}], `)
              }</p>
              <div className="d-grid">
                <Link to={`/${questionId}/editanswer/${id}`} className='btn btn-primary'>Edit Answer</Link>
              </div>
              <div className="d-grid">
                <Link to={`/${questionId}/likeanswer/${id}`} className='btn btn-success mt-2'>Like Answer</Link>
              </div>
              <div className="d-grid">
                <Link to={`/${questionId}/undolikeanswer/${id}`} className='btn btn-danger mt-2'>Undolike Answer</Link>
              </div>
            </div>
          </div>
      </div>
    )
  }

  return (
    <div>
      <Answers answers={answers}/>
    </div>
  )
}

export default GetAllAnswersToQuestion;
