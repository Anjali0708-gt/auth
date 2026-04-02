import {useEffect, useState} from 'react';
import api from './api';
import toast from 'react-hot-toast';
import './App.css'

function SignIn()
{
   const[data,setdata]= useState(null);
   const[name,setname]=useState("");
   const[email,setemail]=useState("");
   const[password,setpassword]= useState("");
   const[loading,setloading]= useState(false);
  //  const API_URL=`https://resetpasswordproject.onrender.com/signup`;

  async function handledata(e)
  {
     e.preventDefault()
     setloading(true);
     try{
         
      if(name.trim()=="")
      {
        toast.error("Please enter your name");
        return;
      }
      if(email.trim()=="")
           {
            toast.error("Please enter your email");
            return;
           }
      if(password.trim()=="")
           {
            toast.error("Please enter your password");
            return;
           }
      // console.log("Sending data:", { name, email, password });
     
      const res= await api.post("/api/auth/signup",
        {
            name:name,
            email:email,
            password:password
        }
        
      )
      toast.success("user register");
      setdata(res.data.user);
      setemail("")
      setname("")
      setpassword("")
    }
    
    catch(e)
    {
        console.log("erroor while signin",e.response?.data||e.message);
        toast.error("can't signin")
        // console.log("error while signin", e.response?.data || e.message);
    }
    finally{
      setloading(false);
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

          <button type="submit" disabled={loading} >{loading?"loading...":"Sign Up"}</button>
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