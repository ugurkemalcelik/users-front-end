import React, { useState } from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import DisplayMessage from './DisplayMessage';


const Login = () => {

  const [form,setForm] = useState({
    email: "",
    password: ""
  })

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

  const {email,password} = form;

  const navigate = useNavigate();

  return (
    <div>
      <h3 className='text-center'>Login Page</h3>
        <DisplayMessage state={state}/>
      <div className="card col-md-6" style={{margin:"auto"}}>
        <div className="card-header">
          <form onSubmit={async (e) => {

            e.preventDefault();            

            const user = {
              email,
              password
            }

            try {

              const response = await axios.post(`https://ukcbackend.up.railway.app/api/auth/login`,user);              

              const {access_token} = response.data;

              const expires = new Date(Date.now() + 1000 * 60 *10);

              document.cookie = `access_token=${access_token};expires=${expires}`;              

              setForm({
                email: "",
                password: ""
              })

              setState({
                message: response.data.message,
                alert: "alert alert-success mb-3 col-md-6"
              }) 

              navigate("/profile");

            } catch (err) {

              setState({
                message: err.response.data.message,
                alert: "alert alert-danger mb-3 col-md-6"
              })             

              setForm({
                email: "",
                password: ""
              })

            }

          }}>
            <label htmlFor="email" className='form-label'> Email: </label>
            <input 
              type="email"
              className='form-control'
              id='email'
              placeholder='Please provide an email'
              name='email'
              value={email}
              onChange={onChangeHandler}
            />
            <label htmlFor="password" className='form-label'> Password: </label>
            <input 
              type="password"
              className='form-control'
              id='password'
              placeholder='Please provide an password'
              name='password'
              value={password}
              onChange={onChangeHandler}
            />
            <div className="d-grid">
              <input type="submit" className='btn btn-primary mt-4 mb-2' />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login;
