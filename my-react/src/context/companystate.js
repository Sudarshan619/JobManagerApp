import { default as CompanyContext } from "./companycontext";
import React, { createContext, useContext, useState } from "react";
import Swal from "sweetalert2";
import ShowWebsite from "../components/showWebsite";

const CompanyState = (props) => {
  const [response, setResponse] = useState(null);
  const [table,setTable] = useState([]);
  const [result,setResult] = useState([]);
  const [order,setOrder] = useState('1');
  const [token,setToken] = useState('');
  const [job,setJob] = useState([]);
  const [userdata,setUserdata] = useState({});

  const setDetails = async (data)=>{
      setUserdata(data);
  }

  const getDetails= async()=>{
      return userdata;
  }

  const postData = async (data) => {
    try {
      const res = await fetch('https://jobmanagerapp-5.onrender.com/dns', {
        method: "POST",
        mode: "cors", 
        headers: {
          "auth-token": token,
           "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const ans = await res.json();
      console.log(ans.message)
      if (ans.message == "success") {
        console.log("success")
        Swal.fire({
          title: 'Added successfully',
          text: 'Do you want to continue',
          icon: 'success',
          confirmButtonText: 'Cool'
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Do you want to continue',
          icon: 'error',
          confirmButtonText: 'Cool'
        });
      }
      console.log(data);
      // const result = await res.json();
      console.log(result);
      setResponse(result);
    } catch (error) {
      console.error("Error posting data:", error);
      setResponse(null);
    }
  };
  const GetData = async () => {
    try {
      const result = await fetch('https://jobmanagerapp-5.onrender.com/show', {
        method: "GET",
        mode: "cors", 
        headers: {
           "auth-token": token,
           "Content-Type": "application/json",
        },
      });
     
      const result1 = await result.json();
      return (result1);
      
      // setTable(result1) 
      
     
    } catch (error) {
      console.error("Error posting data:", error);
      // setResponse(null);
    }
};
const GetDataBySearch = async (data) => {
  try {
    const result = await fetch(`https://jobmanagerapp-5.onrender.com/show/${data}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "auth-token": token,
         "Content-Type": "application/json",
      },
    });
   
    return result.json();
   
    // setTable(result1)
    
    // setTable(result1); // Update to setTable(result1) instead of setTable(result)
  } catch (error) {
    console.error("Error posting data:", error);
    // setResponse(null);
  }
};
const DeleteData = async (data) => {
  try {
    await fetch(`https://jobmanagerapp-5.onrender.com/show/${data}`, {
      method: "DELETE",
      mode: "cors", 
      headers: {
        "auth-token": token,
         "Content-Type": "application/json",
      },
    });
    // console.log(result1);
    // return result1;
    
    
  } catch (error) {
    console.error("Error posting data:", error);
    
  }
};
const DeleteAllData = async () => {
  try {
    const result1 = await fetch(`https://jobmanagerapp-5.onrender.com/show`, {
      method: "DELETE",
      mode: "cors", 
      headers: {
         "Content-Type": "application/json",
      },
    });
    
  } catch (error) {
    console.error("Error posting data:", error);
    
  }
};
// const sendMail
const ApplyFilter = async (data,order) => {
  console.log(data)
  if(order === -1){
    setOrder(1);
   }
    else{
  setOrder(-1);
   }
  try {
    const result = await fetch(`https://jobmanagerapp-5.onrender.com/filter/${data}/${order}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "auth-token": token,
         "Content-Type": "application/json",
      },
    });
   
    const result1 = await result.json();
    return result1;
    // console.log(result1);
    // setTable(result1) 
    
    // setTable(result1); // Update to setTable(result1) instead of setTable(result)
  } catch (error) {
    console.error("Error posting data:", error);
    
  }
};
const UpdateData = async (data,id) => {
  try {
    const res = await fetch(`https://jobmanagerapp-5.onrender.com/update?id=${id}`, {
      method: "PUT",
      mode: "cors", 
      headers: {
        "auth-token": token,
         "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if(data){
      Swal.fire({
        title: 'Success',
        text: 'Do you want to continue',
        icon: 'success',
        confirmButtonText: 'Ok'
      })
    }
    
    // console.log(data);
    // const result = await res.json();
    // console.log(result);
    // setResponse(result);
  } catch (error) {
    console.error("Error posting data:", error);
    setResponse(null);
  }
};
const signUp = async (data)=>{
  try {
    const result = await fetch('https://jobmanagerapp-5.onrender.com/signin', {
      method: "POST",
      mode: "cors", 
      headers: {
         "Content-Type": "application/json"
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
const Login = async (data)=>{
  try {
    const result = await fetch('https://jobmanagerapp-5.onrender.com/login', {
      method: "POST",
      mode: "cors", 
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });
   
    const result1 = await result.json();
    setToken(result1);
    return result1;

  } catch (error) {
    console.error("Error posting data:", error);
    // setResponse(null);
  }
}
const Website = async (data)=>{
  try {
    const result = await fetch('https://jobmanagerapp-5.onrender.com/website', {
      method: "POST",
      mode: "cors", 
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });
   
    const result1 = await result.json();
    setToken(result1);
    return result1;

  } catch (error) {
    console.error("Error posting data:", error);
    // setResponse(null);
  }
}
 
const getWebsite = async ()=>{
  try {
    const result = await fetch('https://jobmanagerapp-5.onrender.com/website', {
      method: "GET",
      mode: "cors", 
      headers: {
         "Content-Type": "application/json",
      }
    });
   
    const result1 = await result.json();
   
    return result1;

  } catch (error) {
    console.error("Error posting data:", error);
    // setResponse(null);
  }
}
const getWebsiteByJob = async (data)=>{
  try {
    const result = await fetch(`https://jobmanagerapp-5.onrender.com/showWebsite/${data}`, {
      method: "GET",
      mode: "cors", 
      headers: {
         "Content-Type": "application/json",
      }
    });
   
    const result1 = await result.json();
   
    return result1;

  } catch (error) {
    console.error("Error posting data:", error);
    // setResponse(null);
  }
}

const updateWebsite = async(data)=>{
  try {
    const result = await fetch(`https://jobmanagerapp-5.onrender.com/showWebsite`, {
      method: "PUT",
      mode: "cors", 
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });
   
    const result1 = await result.json();
   
    return result1;

  } catch (error) {
    console.error("Error posting data:", error);
    // setResponse(null);
  }
}

const setWebsiteJob = (data)=>{
   
    setJob(data);
    console.log(job)
}
const DeleteWebsite = async (data)=>{
   try{
    const result = await fetch(`https://jobmanagerapp-5.onrender.com/deleteWebsite/${data}`, {
      method: "DELETE",
      mode: "cors", 
      headers: {
         "Content-Type": "application/json",
      },
    });
    const ans = await result.json();
    console.log(ans.message)
    if (ans.message == "success") {
      console.log("success")
      Swal.fire({
        title: 'Added successfully',
        text: 'Do you want to continue',
        icon: 'success',
        confirmButtonText: 'Cool'
      });
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Do you want to continue',
        icon: 'error',
        confirmButtonText: 'Cool'
      });
    }
   }
   catch(e){
    console.error("Error posting data:", e);
   }
   
}
  const contextValue = {
    response,
    postData,
    GetData,
    table,
    DeleteData,
    result,
    GetDataBySearch,
    ApplyFilter,
    order,
    UpdateData,
    DeleteAllData,
    signUp,
    Login,
    Website,
    getWebsite,
    getWebsiteByJob,
    updateWebsite,
    setWebsiteJob,
    job,
    setDetails,
    getDetails,
    userdata,
    DeleteWebsite
    
  };

  return (
    <CompanyContext.Provider value={contextValue}>
      {props.children}
      {/* <ShowWebsite job={job}></ShowWebsite> */}
    </CompanyContext.Provider>
  );
};

export default CompanyState;
