import "./NavBar.css"
import f1_logo from "../../assets/F1_logo.png"
import user_icon from "../../assets/iconmonstr-user.svg"
import cart_icon from "../../assets/iconmonstr-shopping-cart.svg"
import { Link, useMatch, useResolvedPath } from "react-router-dom"

export const NavBar = () =>{
    return <nav className="navbar">
        <Link to="/">
            <img src={f1_logo} alt="F1 Logo" className="f1_logo"/>
        </Link>

        <ul>
            <CustomLink to="/">Home</CustomLink>  {/* className="active" */}
            <CustomLink to="/Calendar">Calendar</CustomLink>
            <CustomLink to="/About">About</CustomLink>
            <CustomLink to="/Contact">Contact Us</CustomLink>
        </ul>
        
        <Link to="/login" className="clickable_icon">
            <img src={user_icon} alt="User Icon" className="user_icon"/>
        </Link>
        
        <Link to="/shopping-cart" className="clickable_icon">
            <img src={cart_icon} alt="Cart Icon" className="cart_icon"/>
        </Link>
    </nav>
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