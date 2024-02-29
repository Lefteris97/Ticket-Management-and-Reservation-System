import './Menu.css'
import { Link } from 'react-router-dom'
import { AiFillHome, AiOutlineUser, AiOutlineTeam, AiFillFlag  } from "react-icons/ai";
import { BsTicketPerforated, BsBarChartSteps } from "react-icons/bs";

const Menu = () =>{
    return (
        <div className="menu">
            <div className="menuItem">
                <span className="title">MAIN</span>
                <Link to={'/'} className='listItem'>
                    <AiFillHome size={21}/>
                    <span className="listItemTitle">Home</span>
                </Link>
                {/* <Link to={'/profile'} className='listItem'>
                    <AiOutlineUser size={21}/>
                    <span className="listItemTitle">Profile</span>
                </Link> */}
                <span className="title">CRUD</span>
                <Link to={'/users'} className='listItem'>
                    <AiOutlineTeam size={21}/>
                    <span className="listItemTitle">Users</span>
                </Link>
                <Link to={'/events'} className='listItem'>
                    <AiFillFlag size={21}/>
                    <span className="listItemTitle">Events</span>
                </Link>
                <Link to={'/stands'} className='listItem'>
                    <BsBarChartSteps size={21}/>
                    <span className="listItemTitle">Stands</span>
                </Link>
                <Link to={'/tickets'} className='listItem'>
                    <BsTicketPerforated size={21}/>
                    <span className="listItemTitle">Tickets</span>
                </Link>
            </div>
        </div>
    )
}

export default Menu