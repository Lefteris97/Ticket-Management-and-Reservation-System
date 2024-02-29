import { useEffect, useState } from 'react';
import './Login.css'
import { useRef } from 'react';
import axios from 'axios'
import useAuth from '../../hooks/useAuth'
import { useLocation, useNavigate } from 'react-router-dom';

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

    useEffect(() =>{
        emailRef.current.focus();
    }, [])

    useEffect(() =>{
        setErrMsg('');
    }, [email, pwd])

    const handleSubmit = async (e) =>{
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:7000/auth/login', JSON.stringify({
                email:email,
                password:pwd
            }), {
                headers: {'Content-Type' : 'application/json'},
                withCredentials: true
            });

            const accessToken = response?.data?.accessToken;
            const role = response?.data?.role;

            // setAuth({email, pwd, role, accessToken});

            if (role === "admin" || role === "tc") {
                setAuth({email, pwd, role, accessToken});
            
                navigate(from, { replace: true }); // edw einai to thema
                
            } else {
                setErrMsg('Access not allowed');
                // return;
            }

            setEmail('');
            setPwd('');

        } catch (error) {
            console.log('Error:', error);   
            if (!error?.response){
                setErrMsg('No Server Response');
            } else if(error.response?.status === 400){
                setErrMsg('Wrong Email or Password');
            } else if(error.response?.status === 401){
                setErrMsg('Unauthorized');
            } else{
                setErrMsg('Login Failed');
            }

            errRef.current.focus();

            setTimeout(() => {
                setErrMsg('');
            }, 3000);
        }

    }

    return (
        <div className="login">
            <div className="wrapper">
                <h1>Login to F1 Dashboard</h1>
                <form className="right" onSubmit={handleSubmit}>

                    <input 
                        type="email" 
                        id="email"
                        ref={emailRef}
                        placeholder="Email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input 
                        type="password" 
                        id="password"
                        placeholder="Password" 
                        value={pwd}
                        onChange={(e) => setPwd(e.target.value)}
                        required
                    />

                    <button className="submit">Login</button>

                    <p
                        ref={errRef} 
                        className={errMsg ? "errmsg" : "offscreen"}   aria-live="assertive">{errMsg}
                    </p>

                </form>
            </div>  
        </div>
    )
}

export default Login