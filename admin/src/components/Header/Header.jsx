import './Header.css'

const Header = () =>{

    const logout = () =>{
        window.open("http://localhost:7000/auth/logout/dash", "_self")
    };

    return (
        <div className="header">
            <div className="title">F1 Tickets Dashboard</div>
            <button className='logoutBtn' onClick={logout}>Logout</button>
        </div>
        
    )
}

export default Header