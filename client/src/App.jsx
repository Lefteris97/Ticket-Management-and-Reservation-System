// import React, {useState} from "react";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./pages/HomePage/Home";
import Calendar from "./pages/CalendarPage/Calendar";
import Contact from "./pages/ContactPage/Contact";
import Profile from "./pages/Profile";
import Event from "./pages/EventPage/Event";
import { Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import useAuth from "./hooks/useAuth";

const App = () => {

  const [user, setUser] = useState(null);

  const { auth } = useAuth(); // Get the auth state using the useAuth hook

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get('http://localhost:7000/auth/login/succeeded', {
          withCredentials: true,
        });
        if (response.status === 200) {
          console.log(response.data)
          setUser(response.data.user);
        } else {
          throw new Error('Error during authentication');
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  // console.log(user);
  // Determine if a user is logged in based on the auth state
  const isLoggedIn = !!auth.accessToken || !!user;
  // console.log('ISLOGGEDIN == ', isLoggedIn);
  // console.log('auth id == ', auth.user_id);
  console.log('auth user == ', auth?.user);
  // console.log('auth email == ', auth.email);

  return(
    <>
      <div className="container">
        <NavBar user={isLoggedIn}/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/calendar" element={<Calendar auth={auth}/>} />
          {/* <Route path="/about" element={<About/>} /> */}
          <Route path="/contact-us" element={<Contact/>} />
          <Route path="/gp/:eventId" element={<Event auth={auth}/>}/>
          <Route 
                path="/profile" 
                // element={ isLoggedIn ? <Profile/> : <Navigate to="/login"/>} 
                element={<Profile></Profile>} 
          />
          <Route 
                path="/login" 
                element={ isLoggedIn ? <Navigate to="/" /> : <Login/>} 
          />

          <Route path="/sign-up" element={<Register/>} />
        </Routes>

        
      </div>
    </>
  )
}

export default App