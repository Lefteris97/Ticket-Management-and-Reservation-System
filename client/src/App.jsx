import React from "react";
import NavBar from "./components/NavBar";
import Home from "./pages/Home"
import Calendar from "./pages/Calendar"
import About from "./pages/About"
import Contact from "./pages/Contact"
import { Route, Routes} from "react-router-dom"


const App = () => {
  return(
    <>
      {/* <div className="container"> */}
      <NavBar/>
      <hr></hr>
      {/* </div> */}
      <div className="container">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/Calendar" element={<Calendar/>} />
          <Route path="/About" element={<About/>} />
          <Route path="/Contact" element={<Contact/>} />
        </Routes>
      </div>
    </>
  )
}

export default App