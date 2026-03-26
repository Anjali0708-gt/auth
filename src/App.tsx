import {useEffect, useState} from 'react';
import { BrowserRouter, Link,Route,Routes } from 'react-router';
import SignIn from './SignIn';
import LogIn from './LogIn';
import { Toaster } from "react-hot-toast";
// import './App.css'
function App()
{

  return(
    <>
    <div className="container">
  
    <h1>user registration </h1>
      <Toaster position="top-right" />

    <BrowserRouter>
    <nav>
      <Link to ="/signIn" className="nav-btn">signIn</Link>
      <Link to ="/logIn" className="nav-btn">logIn</Link>
    </nav>
    <Routes>
      <Route path="/signIn" element={<SignIn/>}></Route>
      <Route path="/logIn" element={<LogIn/>}></Route>
    </Routes>
    </BrowserRouter>
    </div>
    </>
  )
}

export default App;