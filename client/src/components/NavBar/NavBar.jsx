import { useState } from "react"
import "./NavBar.css"
import f1_logo from "../../assets/logos_and_icons/F1_logo.png"
import user_icon from "../../assets/logos_and_icons/iconmonstr-user.svg"
import cart_icon from "../../assets/logos_and_icons/iconmonstr-shopping-cart.svg"
import { Link, useMatch, useResolvedPath } from "react-router-dom"

export const NavBar = ({user}) =>{
    console.log('USER: ', user);
    
    const [isActive, setActive] = useState(false);

    const logout = () =>{
        window.open("http://localhost:7000/auth/logout", "_self")
    };

    return <div className="navbar">
        <Link to="/">
            <img src={f1_logo} alt="F1 Logo" className="f1_logo"/>
        </Link>

        <ul>
            <CustomLink to="/">Home</CustomLink> 
            <CustomLink to="/calendar">Calendar</CustomLink>
            <CustomLink to="/about">About</CustomLink>
            {/* <CustomLink to="#">FAQs</CustomLink> */}
            <CustomLink to="/contact-us">Contact Us</CustomLink>
        </ul>

        { user ? (
            <div className="ifLogged">
                <div className="dropdown-profile" onClick={e => setActive(!isActive)}>
                    {/* <Link to="/profile" className="clickable_icon">    */}
                    <img src={user_icon} alt="User Icon" className="user_icon"/>
                    {/* </Link> */}

                    {isActive && (
                        <div className="profile-menu">
                            <div className="dropdown-option"><Link to='#'>Profile</Link></div>
                            <div className="dropdown-option" onClick={logout}>
                                <Link to='#'>
                                    Logout
                                </Link>
                            </div>
                        </div>
                    )}
                    
                </div>
            
                
                <Link to="/shopping-cart" className="clickable_icon">
                    <img src={cart_icon} alt="Cart Icon" className="cart_icon"/>
                </Link>
            </div>
        ) : (  
            <Link to="/login" className="clickable_icon">   
                <img src={user_icon} alt="User Icon" className="user_icon"/>
            </Link>
        )}
        
    </div>
}

const CustomLink = ({ to, children, ...props}) =>{
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true})

    return(
        <li className = { isActive? "active" : ""}>
            <Link to = { to } { ...props }>
                { children }
            </Link>
        </li>
    )
}

export default NavBar