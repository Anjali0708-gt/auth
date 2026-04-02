
import { BrowserRouter, Link,Route,Routes,Navigate } from 'react-router';
import SignIn from './SignIn';
import LogIn from './LogIn';
import { Toaster } from "react-hot-toast";
import Forget from "./Forget";
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
        <Route path="/" element={<Navigate to="/logIn" />} />
      <Route path="/signIn" element={<SignIn/>}></Route>
      <Route path="/logIn" element={<LogIn/>}></Route>
        <Route path="/forget" element={<Forget />} />
    </Routes>
    </BrowserRouter>
    </div>
    </>
  )
}

export default App;