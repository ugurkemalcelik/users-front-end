import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSkullCrossbones } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import DisplayMessage from './DisplayMessage';
import {useNavigate} from "react-router-dom";

const Register = () => {

  const [form,setForm] = useState({    
    name: "",
    email: "",
    password: "",
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

  const navigate = useNavigate();
  
  const {name,email,password,role,title,place,website,about} = form;

  return (
    <div className='text-center'>
      <h3> Register Page </h3>
        <DisplayMessage state={state}/>      
      <div className="card col-md-6 text-start" style={{margin:"auto"}}>
        <div className="card-header">
          <form onSubmit={async (e) => {

            e.preventDefault();       

            const newUser = {

              name,
              email,
              password,
              role,
              title,
              place,
              website,
              about

            }

            try {

              const response = await axios.post(`https://ukcbackend.up.railway.app/api/auth/register`,newUser);

              const {access_token} = response.data;

              const expires = new Date(Date.now() + 1000 * 60 * 10);

              document.cookie = `access_token=${access_token};expires=${expires}`;

              setForm({
                name: "",
                email: "",
                password: "",
                role: "user",
                title: "",
                place: "",
                website: "",
                about: ""
              })             

              setState({
                message: response.data.message,
                alert: "alert alert-success mb-3 col-md-6"
              }) 
              
              navigate("/getallusers");

            } catch (err) {

              setState({
                message: err.response.data.message,
                alert: "alert alert-danger mb-3 col-md-6"
              })

              setForm({
                name: "",
                email: "",
                password: "",
                role: "user",
                title: "",
                place: "",
                website: "",
                about: ""
              })             

            }

          }}>

            <label htmlFor="name" className='form-label'> Name: </label>
            <div className="d-flex">
              <input
                type="text"
                className='form-control' 
                placeholder='Please provide a name'
                id='name'
                name='name'
                value={form.name}
                onChange={onChangeHandler}
              />
              <FontAwesomeIcon icon={faSkullCrossbones} className='ms-3 text-danger'/>
            </div>
            
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
              <FontAwesomeIcon icon={faSkullCrossbones} className='ms-3 text-danger'/>
            </div>

            <label htmlFor="password" className='form-label'> Password: </label>
              <div className="d-flex">
                <input
                  type="password"
                  className='form-control' 
                  placeholder='Please provide a password'
                  id='password'
                  name='password'
                  value={form.password}
                  onChange={onChangeHandler}
              />
              <FontAwesomeIcon icon={faSkullCrossbones} className='ms-3 text-danger'/>
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

export default Register;
