import axios from 'axios';
import React, { useState } from 'react';
import {useSearchParams} from "react-router-dom";
import DisplayMessage from './DisplayMessage';

const ResetPassword = () => {

  const [form,setForm] = useState({
    password: "",
    token: ""
  }) 

  const [searchParams,setSearchParams] = useSearchParams();  

  const [state,setState] = useState({
    message: "",
    alert: ""
  });

  const onChangeHandle = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    })    

  }  

  const {password,token} = form;

  return (
    <div>
      <h5 className='text-center'>Reset Password Page</h5>
      <DisplayMessage state={state}/>
      <div className="card col-md-6" style={{margin:"auto"}}>
        <div className="card-header">
          <form onSubmit={async (e) => {

            e.preventDefault(); 
            
            const params = new URLSearchParams();
            params.set("resetPasswordToken", token);            
            setSearchParams(params);  
            
            try {

              const response = await axios.post(`https://ukcbackend.up.railway.app/api/auth/resetpassword?resetPasswordToken=${token}`,{
                password: password
              })

              setState({
                message: response.data.message,
                alert: "alert alert-success mb-3 col-md-6"
              })

            } catch (err) {
              
              setState({
                message: err.response.data.message,
                alert: "alert alert-danger mb-3 col-md-6"
              })

            }

          }}>
            <label htmlFor="password" className='form-label'>New Password:</label>
            <input
              type="password"
              placeholder='Please provide your new password'
              className='form-control'
              id='password'
              name='password'
              value={password} 
              onChange={onChangeHandle}
            />
            <label htmlFor="token" className='form-label'> resetPasswordToken: </label>
            <input
              type="token"
              placeholder='Please provide a valid resetPasswordToken'
              className='form-control'
              id='token'
              name='token'
              value={token} 
              onChange={onChangeHandle}
            />
            <div className="d-grid">
              <input type="submit" className='btn btn-primary mt-3' value={"Send"}/>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword;
