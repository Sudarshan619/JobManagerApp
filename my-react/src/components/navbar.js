import React, { useState, useContext, useEffect } from 'react'
import CompanyContext from '../context/companycontext';
import { Link } from 'react-router-dom'
import '../nav.css'
import { useAuth0 } from "@auth0/auth0-react";

export default function Navbar() {
  const { user, isAuthenticated, loginWithRedirect, logout, isLoading, error } = useAuth0();
  const [Premium, setPremium] = useState(false);

  console.log("user data", user);
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
      <div className="modal fade " id="staticBackdrop3" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel2" aria-hidden="true">
                    <div className="modal-dialog gold">
                        <div className="modal-content gold">

                            <div className="modal-header">
                                <h2 className="modal-title fs-5" id="staticBackdropLabel2">Premium Access</h2>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                Do you want to get <b>Premium Access </b>from the Job list?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                                   >TAKE</button>
                            </div>
                        </div>
                    </div>
                </div>
        <Link className="navbar-brand" to="#">Job Manager</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-Link  active" aria-current="page" to="/">Home</Link>
            </li>
            {Premium ? <li className="nav-item gold">
              <Link className="nav-Link " aria-current="page" to="/">Premium
                <svg style={{ width: "20px" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M309 106c11.4-7 19-19.7 19-34c0-22.1-17.9-40-40-40s-40 17.9-40 40c0 14.4 7.6 27 19 34L209.7 220.6c-9.1 18.2-32.7 23.4-48.6 10.7L72 160c5-6.7 8-15 8-24c0-22.1-17.9-40-40-40S0 113.9 0 136s17.9 40 40 40c.2 0 .5 0 .7 0L86.4 427.4c5.5 30.4 32 52.6 63 52.6H426.6c30.9 0 57.4-22.1 63-52.6L535.3 176c.2 0 .5 0 .7 0c22.1 0 40-17.9 40-40s-17.9-40-40-40s-40 17.9-40 40c0 9 3 17.3 8 24l-89.1 71.3c-15.9 12.7-39.5 7.5-48.6-10.7L309 106z" /></svg>
              </Link>
            </li> :
              <li className="nav-item gold">
                <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop3">
                 Premium<svg style={{ width: "20px" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M309 106c11.4-7 19-19.7 19-34c0-22.1-17.9-40-40-40s-40 17.9-40 40c0 14.4 7.6 27 19 34L209.7 220.6c-9.1 18.2-32.7 23.4-48.6 10.7L72 160c5-6.7 8-15 8-24c0-22.1-17.9-40-40-40S0 113.9 0 136s17.9 40 40 40c.2 0 .5 0 .7 0L86.4 427.4c5.5 30.4 32 52.6 63 52.6H426.6c30.9 0 57.4-22.1 63-52.6L535.3 176c.2 0 .5 0 .7 0c22.1 0 40-17.9 40-40s-17.9-40-40-40s-40 17.9-40 40c0 9 3 17.3 8 24l-89.1 71.3c-15.9 12.7-39.5 7.5-48.6-10.7L309 106z" /></svg>
                </button>
              </li>}

            {/* {isAuthenticated && */}
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
            {/* } */}

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
