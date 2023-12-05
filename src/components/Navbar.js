import React from 'react';
import {Link} from "react-router-dom";


const Navbar = ({title}) => {
  return (
    <div className='col-md-12 bg-primary'>
      <div className="card bg-primary">
            <div className="card-header">
                <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
                    <div className="container-fluid">
                        <a className="navbar-brand" href='/'>{title}</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/register">Register</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/profile">Profile</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/login">Login</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/logout">Logout</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="upload">Upload</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/forgotpassword">ForgotPassword</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/resetpassword">ResetPassword</a>
                                </li>                                
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href='/' role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        UserProcess
                                    </a>
                                <ul className="dropdown-menu">                                    
                                    <li><Link className="dropdown-item" to={"/getallusers"}>Get All Users</Link></li>
                                    <li><Link className="dropdown-item" to={`/getsingleuser/:id`}>Get Single User</Link></li>
                                </ul>
                                </li>

                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href='/' role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        QuestionProcess
                                    </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="/addquestion">Add Question</a></li>
                                    <li><a className="dropdown-item" href="/getallquestions">Get All Questions</a></li>                                
                                    
                                </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
      </div>
    </div>
  )
}

export default Navbar;
