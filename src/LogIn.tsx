import { useState } from 'react';
import api from "./api";   //
import './App.css'
// import axios from 'axios';
import { Link } from "react-router";
import toast from 'react-hot-toast';
import { useAuthStore } from "./store/authstore";

function LogIn() {
  const [data, setdata] = useState(null);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const[loading,setloading]= useState(false);
  

  const setToken= useAuthStore((t)=> t.settoken)
  const token= useAuthStore((t)=>t.token);
  const logout = useAuthStore((t)=>t.logout)

  async function handledata(e) {
    e.preventDefault();
    setloading(true);

    try {
      
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
      const res = await api.post("/api/auth/login", {   
        email: email,
        password: password
      });
      setToken(res.data.token);
      console.log("Login clicked");
      toast.success("user login sucessfully")
      

      setdata(res.data.user);
      setemail("");
      setpassword("");

    } catch (e) {
      console.log("error while login", e.response?.data);
          setemail("");
      setpassword("");
      toast.error("login failed");
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

          <button type="submit" disabled={loading} >{loading?"loading...":"login"}</button>

            
               <Link to = "/forget">forget password</Link>
    
    
        </form>
      </div>
    )}

    {data && (
      <div className="card welcome">
        <h1>🎉 Welcome!</h1>
        <h2>{data.name}</h2>
        <p>{data.email}</p>
       
       {token && <p className="token-box">Token: {token}</p>}
       <br />
       <button onClick={()=>{logout(); setdata("")}}>logout</button>
      </div>
      
     
    )}
       
    

  </div>
 
    

    </>
  );
}

export default LogIn;