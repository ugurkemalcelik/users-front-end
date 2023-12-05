import React, { useEffect, useState } from 'react';
import axios from "axios";
import DisplayMessage from './DisplayMessage';
import { useParams } from 'react-router-dom';
import {useNavigate} from "react-router-dom";

const EditUser = () => {

  const {id} = useParams(); 

  const [form,setForm] = useState({    
    
    email: "",    
    role: "user",
    title: "",
    place: "",
    website: "",
    about: ""
  })    

  const onChangeHandler = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    })   
    
  }
  
  const [state,setState] = useState({
    message: "",
    alert: ""
  })

  const getUser = async () => {

    const response = await axios.get(`https://ukcbackend.up.railway.app/api/users/${id}`);

    setForm({
      email: response.data.data.email,    
      role: response.data.data.role,
      title: response.data.data.title,
      place: response.data.data.place,
      website: response.data.data.website,
      about: response.data.data.about
    })

  }

  useEffect(() => {
    getUser();
  },[])
  
  const {email,role,title,place,website,about} = form; 
  
  const navigate = useNavigate();

  return (
    <div className='text-center'>
      <h3> Edit User Page </h3>
        <DisplayMessage state={state}/>      
      <div className="card col-md-6 text-start" style={{margin:"auto"}}>
        <div className="card-header">
          <form onSubmit={async (e) => {

            e.preventDefault();       

            const updateUser = {
              
              email,              
              role,
              title,
              place,
              website,
              about

            }

             const access_token = document.cookie.split("access_token=")[1];         

            try {

              const response = await axios.put(`https://ukcbackend.up.railway.app/api/auth/edit/${id}`,updateUser,{
                headers: {
                  authorization: `Bearer: ${access_token}`
                }
              });              

              setForm({
                
                email: "",                
                role: "",
                title: "",
                place: "",
                website: "",
                about: ""

              })              

              setState({
                message: response.data.message,
                alert: "alert alert-success mb-3 col-md-6"
              })  
              
              navigate("/getallusers")

            } catch (err) {          
              
              setState({
                message: err.response.data.message,
                alert: "alert alert-danger mb-3 col-md-6"
              })

              setForm({                
                email: "",                
                role: "",
                title: "",
                place: "",
                website: "",
                about: ""
              })             

            }

          }}>
            
            <label htmlFor="email" className='form-label'> Email: </label>
            <div className="d-flex">
              <input
                type="text"
                className='form-control' 
                placeholder='Please provide an email'
                id='email'
                name='email'
                value={form.email}
                onChange={onChangeHandler}
              />              
            </div>

            <br />

            <label className='form-label'> Role: </label>
            <br />
            <input type="radio" id='user' name='role' className='me-2' value={"user"} onChange={onChangeHandler}/>
            <label htmlFor="user"> user </label>
            <br />
            <input type="radio" id='admin' name='role' className='me-2' value={"admin"} onChange={onChangeHandler}/>
            <label htmlFor="admin"> admin </label> 
            <br /><br />  

            <label htmlFor="title" className='form-label'> Title: </label>
            <input
              type="text"
              className='form-control' 
              placeholder='Please provide a title'
              id='title'
              name='title'
              value={form.title}
              onChange={onChangeHandler}
            />
            <label htmlFor="place" className='form-label'> Place: </label>
            <input
              type="text"
              className='form-control' 
              placeholder='Please provide a place'
              id='place'
              name='place'
              value={form.place}
              onChange={onChangeHandler}

            />
            <label htmlFor="website" className='form-label'> Website: </label>
            <input
              type="text"
              className='form-control' 
              placeholder='Please provide a website'
              id='website'
              name='website'
              value={form.value}
              onChange={onChangeHandler}
            />
            <label htmlFor="about" className='form-label'> About: </label>
            <br />
            <textarea name="about" id="about" cols="50" rows="5" placeholder='Please provide a data that descripe yourselves' className='form-control' value={form.about} onChange={onChangeHandler}></textarea>
            <div className="d-grid">
              <input type="submit" className='form-input btn btn-primary mt-3 mb-3' value={"Submit"} />
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default EditUser;
