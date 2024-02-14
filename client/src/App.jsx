// import React, {useState} from "react";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./pages/HomePage/Home";
import Calendar from "./pages/CalendarPage/Calendar";
import About from "./pages/About";
import Contact from "./pages/ContactPage/Contact";
import Profile from "./pages/Profile";
import Event from "./pages/EventPage/Event";
// import { Route, Routes} from "react-router-dom";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";

const App = () => {

  // const user = true;
  const [user, setUser] = useState(null);

  // update user status (logged in or not)
  useEffect(() =>{
    const getUser = () =>{
      fetch("http://localhost:7000/auth/login/succeeded", {
        method:"GET",
        credentials: "include",
        headers: {
          Accept:"application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      }).then(response => {
        if(response.status === 200 ) return response.json();
        throw new Error("error during authentication")
      }).then(resObject=>{  
          setUser(resObject.user)
      }).catch(err => {
        console.log(err)
      })
    };
    getUser();
  }, []) /*empty array = runs on refresh page */

  return(
    <>
      <div className="container">
        <NavBar user={user}/>
        {/* <hr></hr> */}
        {/* </div> */}
        {/* <div className="container"> */}
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/calendar" element={<Calendar/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/contact-us" element={<Contact/>} />
          <Route path="/gp/:eventId" element={<Event/>} />
          <Route 
                path="/profile" 
                element={ user ? <Profile/> : <Navigate to="/login"/>}  
          />
          <Route 
                path="/login" 
                element={ user ? <Navigate to="/" /> : <Login/>} 
          />
          <Route path="/sign-up" element={<Register/>} />
        </Routes>
      </div>
    </>
  )
}

export default App