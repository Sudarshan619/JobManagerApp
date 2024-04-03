import { default as UserContext } from "./usercontext";
import React, { createContext, useContext, useState } from "react";
import Swal from "sweetalert2";

const UserState = (props) => {
   

    const signUp = async (data)=>{
        try {
          const result = await fetch('http://localhost:4000/signin', {
            method: "POST",
            mode: "cors", 
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          });
         
          const result1 = await result.json();
          
          return (result1);
       
         
        } catch (error) {
          console.error("Error posting data:", error);
          // setResponse(null);
        }
      }
      const Login = async (data)=>{
        try {
          const result = await fetch('http://localhost:4000/login', {
            method: "POST",
            mode: "cors", 
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
          });
         
          const result1 = await result.json();
          setToken(result1);
          return (result1);
      
        } catch (error) {
          console.error("Error posting data:", error);
          // setResponse(null);
        }
      }

    const contextValue = {
        signUp,
        Login
        
      };
    return (
        <UserContext.Provider value={contextValue}>
          {props.children}
        </UserContext.Provider>
      );
}

export default UserState;