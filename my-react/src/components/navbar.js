import React, { useState ,useContext, useEffect} from 'react'
import CompanyContext from '../context/companycontext';
import { Link   } from 'react-router-dom'
import '../nav.css'
import { useAuth0 } from "@auth0/auth0-react";

export default function Navbar(){
  const {user, isAuthenticated, loginWithRedirect,logout,isLoading, error} = useAuth0();

  console.log("user data",user);
  console.log("isauth:", isAuthenticated);
  // console.log("user data:", user.email);
  const url = useContext(CompanyContext);

  useEffect(() => {
    if (isAuthenticated && user) {
      // Only update if the email has changed
      url.setDetails(prevDetails => {
        if (prevDetails.email !== user.email) {
          return { email: user.email };
        }
        return prevDetails;
      });
    } else {
      // Only update if the email is not already empty
      url.setDetails(prevDetails => {
        if (prevDetails.email !== "") {
          return { email: "" };
        }
        return prevDetails;
      });
    }
  }, [isAuthenticated, user, url]);
 
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
          {isAuthenticated &&
          <>
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
          </>
           }
          
          <li className="nav-item">
            {isAuthenticated ? (
                <Link className="nav-Link" onClick={(e) => logout()}>Log out</Link>
              ) : (
                <Link className="nav-Link" onClick={(e) => loginWithRedirect()}>Log In</Link>
              )}
           
          </li>
        </ul>
        
      </div>
    </div>
  </nav>
  )
}
