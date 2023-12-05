import React, { useState } from 'react';
import axios from "axios";
import DisplayMessage from './DisplayMessage';

const Upload = () => {

  const [file,setFile] = useState(null);
  
  const [base64Image,setBase64Image] = useState(""); 

  const [state,setState] = useState({
    message: "",
    alert: ""
  })  

  const onChangeHandler = (e) => {

    setFile(e.target.files[0]);   
    
    const image = document.getElementById("image");

    image.src = URL.createObjectURL(e.target.files[0]);    

    const reader = new FileReader();

    reader.onload = (ev) => {
      setBase64Image(ev.target.result);
    }

    reader.readAsDataURL(e.target.files[0]);

  }  
    
  return (
    <div >
      <h1 className='text-center'>Upload Page</h1>
        <DisplayMessage state={state}/>
      <div className="card col-md-6" style={{margin:"auto"}}>
        <div className="card-header">
          <h5 className='text-center'> If You Load An Avatar Image, Click Upload Button </h5>
        </div>
        <div className="card-body">
          <form method='post' encType="multipart/form-data" onSubmit={async (e) => {

            e.preventDefault();

            if(!file){

              setState({
                message: "No File Selected",
                alert: "alert alert-danger mb-3 col-md-6"
              })

              return;
            }

            const access_token = document.cookie.split("access_token=")[1];            

            const fd = new FormData();            

            fd.append("profile_image",file);          

            try {
              
              const response = await axios.post(`https://ukcbackend.up.railway.app/api/auth/upload`,{base64Image},{
                headers: {
                  authorization: `Bearer: ${access_token}`,
                  
                }
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
            <label className='form-label'> Please select a file with extension: .jpg - .jpeg - .gif or .png </label>
            <input type="file" className='form-control' name='file' onChange={onChangeHandler} accept='.jpg,.jpeg,.gif,.png'/>
            <div className="d-grid">              
              <input type="submit" className='form-control btn btn-primary mt-3'/>
            </div>  
            <img id="image" alt='resim' width={"100px"} className='pt-3' />               
          </form>                     
        </div>
      </div>
    </div>
  )
}

export default Upload;
