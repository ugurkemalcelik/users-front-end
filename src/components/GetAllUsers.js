import React, { useEffect, useReducer, useState } from 'react';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import DisplayMessage from './DisplayMessage';
import { Link } from 'react-router-dom';

const reducer = (state,action) => {

  switch (action.type) {
    case "ADD_USERS":
      
      return {
        ...state,
        users: action.payload
      };

    case "DELETE_USER":

      return {
        ...state,
        users: state.users.filter(user => user._id !== action.payload)        
      };
  
    default: 
      return state;
  }

}
/******************************************User************************************************/

const User =  ({id,name,email,role,title,place,website,about,dispatch,avatar}) => {

  const [isVisibleState,setIsVisibleState] = useState({
    isVisible: false
  }) 

  const [state1,setState1] = useState({
    message: "",
    alert: ""
  })

  const {isVisible} = isVisibleState; 

  const access_token = document.cookie.split("access_token=")[1];

  const onDeleteUser = async (e,id) => {

    try {     

      await axios.delete(`https://ukcbackend.up.railway.app/api/admin/delete/${id}`,{
        headers: {
          authorization: `Bearer: ${access_token}`
        }
      });

      dispatch({type: "DELETE_USER",payload: id});

    } catch (err) {      

      alert(err.response.data.message)

    }  

  }  

  return (
    <div>                 
      <div className="card col-md-6 mb-2" style={{margin:"auto"}}>                
        <div className="card-header d-flex justify-content-between" >                
          <h6 style={{cursor: "pointer"}} onClick={(e) => {
            setIsVisibleState({
              isVisible: !isVisible
            })
          }}> {name} </h6>
          <FontAwesomeIcon icon={faTrash} style={{cursor: "pointer"}} onClick={(e) => onDeleteUser(e,id)}/>          
        </div> 
             
        {
          isVisible ? <div className="card-body">         

                        <img src={avatar} alt="avatar" className='card-img-top'/>        
                        <p><b>Email:</b> {email} </p>
                        <p><b>Role:</b> {role} </p>
                        <p><b>Title:</b> {title} </p>
                        <p><b>Place:</b> {place} </p>
                        <p><b>Website:</b> {website} </p>
                        <p><b>About:</b> {about} </p> 
                        <div className="d-grid">
                        
                        </div>                        
                        <div className="d-grid">
                          <Link to={`/edituser/${id}`} className='btn btn-primary'>Edit User</Link>
                        </div>
                        <div className="d-grid">
                          <Link to={`/blockuser/${id}`} className='btn btn-danger mt-1'>Block User</Link>
                        </div>
                      </div>
          : null  
        }          
      </div>      
    </div>      
  )
}

/******************************Users*********************************************************************************/

const Users =  ({users,dispatch,state1}) => {



  return (
    <div>
      <DisplayMessage state={state1}/>
      {
        users.map(user => {
          return (
            <User
              key={user._id}
              id={user._id}
              name={user.name}
              email={user.email}
              role={user.role}
              title={user.title}
              place={user.place}
              website={user.website}
              about={user.about}
              users={users}
              dispatch={dispatch}
              avatar={user.avatar}
            />
          )
        })
      }
    </div>
  )
}

/***************************GetAllUsers**************************************************************************************/

const GetAllUsers = () => {  

  const [state,dispatch] = useReducer(reducer,{
    users: []
  })  

  const [state1,setState1] = useState({
    message: "",
    alert: ""
  })

  const access_token = document.cookie.split("access_token=")[1];

  const getUsers = async () => {  
    
    try {

      const response = await axios.get("https://ukcbackend.up.railway.app/api/users",{
        headers: {
          authorization: `Bearer: ${access_token}`
        }
      });     

      dispatch({type: "ADD_USERS", payload: response.data.data})

      if(response.data.data.length === 0){
        setState1({
          message: "There is no user in database",
          alert: "alert alert-danger mb-3 col-md-6"
        })
      } else {
        setState1({
          message: "Users are listed below",
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

    getUsers();    

  },[])

  const {users} = state; 

  return (
    <div >
      <h5 className='text-center mb-2'>Get All Users Page</h5>      
      <Users users={users} dispatch={dispatch} state1={state1}/>
    </div>
  )
}

export default GetAllUsers;
