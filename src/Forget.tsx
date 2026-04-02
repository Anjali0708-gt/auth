import { useState } from "react";
import api from "./api";
import toast from "react-hot-toast";

import './App.css'
function Forget()

{  
    const[email,setemail]= useState<string>("");
    
     const[loading,setloading]= useState(false);
    
     async function handleform(e){
        e.preventDefault();
        
        setloading(true);
        try
        {
           if(email.trim()=="")
           {
            toast.error("Please enter your email");
            return;
           }
          const res= await api.post(`https://resetpasswordproject.onrender.com/api/auth/forgetpassword`,
            {
                email:email
            }


          );
          toast.success("reset link send")
        //   setdata()
        
          setemail("");

        }
        catch(e)
        {
            
    const msg = e.response?.data?.msg || "Error occurred";
    toast.error(msg);

          
        }
        finally
        {
          setloading(false);
        }
        

     }
      return (
    <div className="container1">
  <h1 className="heading">Forget Password</h1>

  <div className="forget-container">
    <div className="card">
      <h1>Enter email to reset password</h1>

      <p className="helper-text">
        We will send a reset link to your email
      </p>

      <form onSubmit={handleform}>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  </div>
</div>
  );
}

export default Forget;
