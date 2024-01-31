import "./Login.css"
import { Link } from "react-router-dom"
import Google from "../../assets/google_logo.svg"
import Facebook from "../../assets/facebook_logo.svg"
import Apple from "../../assets/apple_logo.svg"

const Login = () =>{

    const google = () =>{
        window.open("http://localhost:7000/auth/google", "_self")
    }

    return (
        <div className="login">
            <h1 className="loginTitle">Choose a Login Method</h1>
            <div className="wrapper">
                <div className="left">
                    <div className="mediaButton google" onClick={google}>
                            <img src={Google} alt="" className="media-logo"/>
                            <p>Continue with Google</p>
                    </div>
                    {/* <div className="mediaButton facebook">
                            <img src={Facebook} alt="" className="media-logo"/>
                            <p>Continue with Facebook</p>
                    </div>
                    <div className="mediaButton apple">
                            <img src={Apple} alt="" className="media-logo"/>
                            <p>Continue with Apple</p>
                    </div> */}
                </div>
                <div className="center">
                    <div className="line"/>
                    <div className="or">OR</div>
                </div>
                <form className="right">
                    {/* <label>Email</label> */}
                    <input type="email" placeholder="Email" required/>
                    {/* <label>Password</label> */}
                    <input type="password" placeholder="Password" required/>
                    <button className="submit">Login</button>
                    <div className="register-link">
                        <p>Don't have an account?</p> <Link to='/sign-up'>Sign up</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login