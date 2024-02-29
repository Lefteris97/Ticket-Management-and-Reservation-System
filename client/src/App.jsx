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
import RequireAuth from "./components/RequireAuth";
import { Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import useAuth from "./hooks/useAuth";

// for testings
import Admin from "./pages/ForTesting/Admin"
import TicketCollector from "./pages/ForTesting/TicketCollector"
import Users from "./pages/ForTesting/Users"

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

  console.log(user);
  // Determine if a user is logged in based on the auth state
  const isLoggedIn = !!auth.accessToken || user;
  console.log('ISLOGGEDIN == ', isLoggedIn);

  return(
    <>
      <div className="container">
        <NavBar user={isLoggedIn}/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/calendar" element={<Calendar/>} />
          {/* <Route path="/about" element={<About/>} /> */}
          <Route path="/contact-us" element={<Contact/>} />
          <Route path="/gp/:eventId" element={<Event/>} />
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

          {/* for testings */}
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/tc" element={<TicketCollector/>}/>
          <Route path="/users" element={<Users/>}/>
          {/* only authorized for about page */}
          {/* <Route element={<RequireAuth/>}> */}
            {/* <Route path="/about" element={<About/>}/> */}
          {/* </Route>   */}
          {/* douleuei to katw */}
          {/* <Route 
            path="/about" 
            element={isLoggedIn ? <About/> : <Navigate to="/login"/> }
          /> */}
        </Routes>

        
      </div>
    </>
  )
}

export default App