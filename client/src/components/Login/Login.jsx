import "./Login.css"
import { Link, useNavigate, useLocation } from "react-router-dom"
import Google from "../../assets/logos_and_icons/google_logo.svg"
import Facebook from "../../assets/logos_and_icons/facebook_logo.svg"
import Apple from "../../assets/logos_and_icons/apple_logo.svg"
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import useAuth from "../../hooks/useAuth"

const Login = () =>{

    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const emailRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const google = () =>{
        window.open("http://localhost:7000/auth/google", "_self")
    }

    useEffect(() =>{
        emailRef.current.focus();
    }, [])

    useEffect(() =>{
        setErrMsg('');
    }, [email, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post(
                'http://localhost:7000/auth/login',
                {
                    email: email,
                    password: pwd
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );
    
            const accessToken = response.data.accessToken;
            const role = response.data.role;
            const user_id = response.data.user_id;
    
            setAuth({ email, pwd, role, user_id, accessToken });
    
            setEmail('');
            setPwd('');
    
            navigate(from, { replace: true });
        } catch (error) {
            if (!error.response) {
                setErrMsg('No Server Response');
            } else if (error.response.status === 400) {
                setErrMsg('Wrong Email or Password');
            } else if (error.response.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
    
            errRef.current.focus();
    
            setTimeout(() => {
                setErrMsg('');
            }, 3000);
        }
    };
    
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
                <form className="right" onSubmit={handleSubmit}>

                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email"
                        ref={emailRef} 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password"
                        value={pwd}
                        onChange={(e) => setPwd(e.target.value)}
                        required
                    />

                    <button className="submit">Login</button>

                    <p
                        ref={errRef} 
                        className={errMsg ? "errmsg" : "offscreen"}   aria-live="assertive">{errMsg}
                    </p>

                    <div className="register-link">
                        <p>Don't have an account?</p> <Link to='/sign-up'>Sign up</Link>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Login