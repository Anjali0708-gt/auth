import {useEffect, useState} from 'react';
import axios from 'axios';
import api from './api';
import './App.css'

function SignIn()
{
   const[data,setdata]= useState(null);
   const[name,setname]=useState("");
   const[email,setemail]=useState("");
   const[password,setpassword]= useState("");
   
  //  const API_URL=`https://resetpasswordproject.onrender.com/signup`;

  async function handledata(e)
  {
     e.preventDefault()
     try{
    
      // console.log("Sending data:", { name, email, password });
     
      const res= await api.post("/api/auth/signup",
        {
            name:name,
            email:email,
            password:password
        }
        
      )

      setdata(res.data.user);
      setemail("")
      setname("")
      setpassword("")
    }
    
    catch(e)
    {
        console.log("erroor while signin",e.response?.data||e.message);
        // console.log("error while signin", e.response?.data || e.message);
    }
      
  }

  return(
    <>
  
  <div className="container">

    {!data && (
      <div className="card">
        <h1>User Registration</h1>

        <form onSubmit={handledata}>
          <input
            type="text"
            value={name}
            placeholder="enter name"
            onChange={(e)=>setname(e.target.value)}
          />

          <input
            type="email"
            value={email}
            placeholder="enter email"
            onChange={(e)=>setemail(e.target.value)}
          />

          <input
            type="password"
            value={password}
            autoComplete="current-password"
            placeholder="enter password"
            onChange={(e)=>setpassword(e.target.value)}
          />

          <button type="submit">Sign Up</button>
        </form>
      </div>
    )}

    {data && (
      <div className="card welcome">
        <h1>🎉 Welcome!</h1>
        <h2>{data.name}</h2>
        <p>{data.email}</p>
      </div>
    )}

  </div>
 
    </>
  )
}

export default SignIn;