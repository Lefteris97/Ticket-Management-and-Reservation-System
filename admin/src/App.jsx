import { useContext } from 'react'
import './App.css'
import Header from './components/Header'
import Login from './components/Login'
import Menu from './components/Menu'
import Event from './pages/EventPage/Event'
import Events from './pages/EventsPage/Events'
import Home from './pages/HomePage/Home'
import Stands from './pages/StandsPage/Stands'
import Tickets from './pages/TicketsPage/Tickets'
import User from './pages/UserPage/User'
import Users from './pages/UsersPage'
import { Navigate, Route, Routes } from "react-router-dom";
import useAuth from './hooks/useAuth'
import OnlyAdmins from './components/OnlyAdmins'

const App = () =>{

  const {auth} = useAuth();

  const isLoggedIn = !!auth.accessToken;
  console.log('ISLOGGEDIN == ', isLoggedIn);

  const LimitedAccess = ({children}) => {

    if(!isLoggedIn){
      return <Navigate to="/login"/>
    }

    return children;
  };

  const FullSecure = ({children}) =>{

    if(!isLoggedIn){
      return <Navigate to="/login"/>
    }

    if(auth.role !== 'admin'){
      return <OnlyAdmins/>
    }

    return children;
  };

  const Layout = ({children}) =>{
    return(
      <div className="main">
        <Header/>
        <div className="container">
          <div className="menuContainer">
            <Menu/>
          </div>
          <div className="contentContainer">
            {children}
          </div>
        </div>
      </div>
    )
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Layout><LimitedAccess><Home/></LimitedAccess></Layout>}
        />
        <Route
          path="/login"
          element={<Login/>}
        />
        <Route
          path="/users"
          element={<Layout><FullSecure><Users/></FullSecure></Layout>}
        />
        <Route
          path="/events"
          element={<Layout><FullSecure><Events/></FullSecure></Layout>}
        />
        <Route
          path="/stands"
          element={<Layout><FullSecure><Stands/></FullSecure></Layout>}
        />
        <Route
          path="/tickets"
          element={<Layout><LimitedAccess><Tickets/></LimitedAccess></Layout>}
        />
        <Route
          path="/users/:id"
          element={<Layout><FullSecure><User/></FullSecure></Layout>}
        />
        <Route
          path="/events/:id"
          element={<Layout><FullSecure><Event/></FullSecure></Layout>}
        />
      </Routes>
    </>
  )
}

export default App
