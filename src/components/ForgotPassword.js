import React, { useState } from 'react';
import axios from "axios";
import DisplayMessage from './DisplayMessage';

const ForgotPassword = () => {

  const [form,setForm] = useState({
    email: ""
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

  const {email} = form; 

  return (
       <div> 
        <h5 className='text-center' >Forgot Password Page</h5>
        <div>
          <DisplayMessage state={state} />
        </div>
      <div className="card col-md-6" style={{margin:"auto"}}>        
        <div className="card-header">
                    <form onSubmit={async (e) => {

                    e.preventDefault();

                    try {
                      console.log(email)
                      const response = await axios.post("https://ukcbackend.up.railway.app/api/auth/forgotpassword",{
                        email: email
                      }); 

                      setState({
                        message: response.data.message,
                        alert: "alert alert-success col-md-6 mb-3"
                      })

                      setForm({
                        email: ""
                      })

                    } catch (err) {

                      setState({
                      message: err.response.data.message,
                      alert: "alert alert-danger col-md-6 mb-3"
                      })
                      
                      setForm({
                        email: ""
                      })
                    }

                }}>
                <label htmlFor="email" className='form-label'> Email: </label>
                <input 
                  type="email"
                  placeholder='Please provide an email'
                  id='email'
                  name='email'
                  className='form-control'
                  value={email}
                  onChange={onChangeHandler}
                />
                <div className="d-grid">
                  <input type="submit" className='btn btn-primary mt-3 mb-2' value={"Send Email"}/>
                </div>
          </form> 
        </div>
      </div>
      </div>  
  )
}

export default ForgotPassword;
