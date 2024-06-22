import React, { useState,useContext } from 'react';
import '../signup.css';
import UserContext from '../context/usercontext'
import CompanyContext from '../context/companycontext';


export default function SignUp () {
  const [name,setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [result,setResult] = useState('');

  const ans = useContext(CompanyContext);

  const handleSignup = async () => {
      const data = await ans.signUp({name,email,password});
	  setResult(data);
	  console.log(data);
     
  };
  const handleLogin = async () => {

	try{
		console.log({email,password});
		const data = await ans.Login({email,password});
		setResult(data);
		console.log(data);
	}
	catch(error){
       console.log(error.message);
	}
	
   
};
 
  return (
    
      <>
    <div className="main">  	
		<input type="checkbox" id="chk" aria-hidden="true"></input>
			<div className="signup">
				<form onSubmit={handleSignup}>
					<label htmlFor="chk" aria-hidden="true">Sign up</label>
					<input type="text" onChange={(e) =>  setName(e.target.value)} name="name" placeholder="User name" required=""/>
					<input type="email" onChange={(e) => setEmail(e.target.value)} name="email" placeholder="Email" required=""/>
					<input type="password" name="password" placeholder="Password" required="" onChange={(e) => setPassword(e.target.value)}/>
					<button >Sign up</button>
				</form>
			</div>

			<div className="login">
				<form onSubmit={handleLogin}>
					<label htmlFor="chk" aria-hidden="true">Login</label>
					<input type="email" onChange={(e) => setEmail(e.target.value)} name="email" placeholder="Email" required=""/>
					<input type="password" onChange={(e) => setPassword(e.target.value)} name="password" placeholder="Password" required=""/>
					<button>Login</button>
				</form>
			</div>
      </div>
      </>

      
   
  );
};


