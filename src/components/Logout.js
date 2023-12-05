import React, { useState } from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";


const Logout = () => {

  const navigate = useNavigate();  

  return (
    <div className='text-center'>
      <h1>Logout Page</h1>
      
      <div className="card col-md-6" style={{margin:"auto"}}>        
        <div className="card-header">
          <h5 > If You Logout This Session, Click Logout Button </h5>
        </div>
        <div className="card-header">
          <div className="d-grid">
            <input type="button" className='btn btn-primary mt-3 mb-3' value={"Logout"} onClick={async (e) => {

              try {

                const access_token = document.cookie.split("access_token=")[1];              

                const response = await axios.get(`https://ukcbackend.up.railway.app/api/auth/logout`,{
                  headers: {
                    authorization: `Bearer: ${access_token}`
                  }
                });                 
                
                const expires = new Date(Date.now() - 1000 * 60 * 100);

                document.cookie = `access_token=${"süre bitti"};expires=${expires}`;             

                navigate("/profile");

              } catch (err) {

                
                
              }

            }}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Logout;
