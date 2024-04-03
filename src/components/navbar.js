import React, { useState ,useContext} from 'react'
import CompanyContext from '../context/companycontext';
import { Link   } from 'react-router-dom'
import '../nav.css'

export default function Navbar(){
 
 
 const url = useContext(CompanyContext);
  return (
    <nav className="navbar bg-dark navbar-expand-lg bg-body-tertiary " data-bs-theme="dark" >
    <div className="container-fluid">
      <Link className="navbar-brand" to="#">Job Manager</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-Link  active" aria-current="page" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-Link  active" aria-current="page" to="/website">Website</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-Link  active" aria-current="page" to="/websiteAdd">Add website</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-Link " to="/dns">Add Work </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-Link " to="/show">Table </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-Link " to="/SignUp">SignUp</Link>
          </li>
        </ul>
        
      </div>
    </div>
  </nav>
  )
}
