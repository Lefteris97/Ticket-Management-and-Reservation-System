import '../Login/Login.css'
import { Link } from "react-router-dom"
import Google from "../../assets/logos_and_icons/google_logo.svg"
import Facebook from "../../assets/logos_and_icons/facebook_logo.svg"
import Apple from "../../assets/logos_and_icons/apple_logo.svg"
import { useRef, useState, useEffect } from 'react'
import axios from 'axios'

const Register = () =>{

    // **could use some regexes**

    const fnameRef = useRef();
    const errRef = useRef();

    const [firstName, setFirstName] = useState('');
    const [validFirstName, setValidFirstName] = useState(false);
    const [firstNameFocus, setFirstNameFocus] = useState(false);

    const [lastName, setLastName] = useState('');
    const [validLastName, setValidLastName] = useState(false);
    const [LastNameFocus, setLastNameFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [EmailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false); 

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const google = () =>{
        window.open("http://localhost:7000/auth/google", "_self")
    }

    // when component loads set focus to user input
    useEffect(() =>{
        fnameRef.current.focus();
    }, [])

    // validate first name
    useEffect(() =>{
        setValidFirstName(firstName);
    }, [firstName])

    // validate last name
    useEffect(() =>{
        setValidLastName(lastName);
    }, [lastName])

    // validate email
    useEffect(() =>{
        setValidEmail(email);
    }, [email])

    // validate password
    useEffect(() =>{
        setValidPwd(pwd);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])

    // for error
    useEffect(() =>{
        setErrMsg('');
    }, [firstName, lastName, email, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault(); // do not reload page

        try {
            const response = await axios.post('http://localhost:7000/auth/register', JSON.stringify({
            fname:firstName,
            lname:lastName,
            email:email,
            password:pwd
            }),
            {
                headers: { 'Content-Type' : 'application/json'},
                withCredentials: true
            });

            setSuccess(true);

            // Hide the success message after 3 seconds (3000 milliseconds)
            setTimeout(() => {
                setSuccess(false);
            }, 3000);

            // Reset the form fields
            setFirstName('');
            setLastName('');
            setEmail('');
            setPwd('');
            setMatchPwd('');

        } catch (error) {
            if (!error?.response){
                setErrMsg('No Server Response');
            } else if (error.response?.status === 500){
                setErrMsg('Email already in use');
            } else{
                setErrMsg('Registration Failed');
            }
            errRef.current.focus(); //set focus on the error

            // Hide the error message after 3 seconds (3000 milliseconds)
            setTimeout(() => {
                setErrMsg('');
            }, 3000);
        }
    }

    return (
        <div className="register">
            <h1 className="loginTitle">Create an account</h1>
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
                    <label htmlFor='firstName'>First Name</label>
                    <input 
                        type="text"
                        id="firstName"
                        ref={fnameRef}
                        autoComplete="off"
                        placeholder="First name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)} 
                        required
                    />

                    <label htmlFor="lastName">Last Name</label>
                    <input 
                        type="text" 
                        id="lastName"
                        autoComplete="off"
                        placeholder="Last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />

                    <label htmlFor='email'>Email</label>
                    <input 
                        type="email" 
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label htmlFor='password'>Password</label>
                    <input 
                        type="password" 
                        id="password"
                        placeholder="Password" 
                        value={pwd}
                        onChange={(e) => setPwd(e.target.value)}
                        required
                    />

                    <label htmlFor="confirm_password">Confirm Password</label>
                    <input 
                        type="password"
                        id="confirm_password" 
                        placeholder="Confirm password" 
                        value={matchPwd}
                        onChange={(e) => setMatchPwd(e.target.value)}
                        required
                    />

                    <button className={`submit ${!validFirstName || !validLastName || !validEmail || !validPwd || !validMatch ? 'disabled' : ''}`} disabled={!validFirstName || !validLastName || !validEmail || !validPwd || !validMatch ? true : false}>Sign up</button>
                    
                    {success ? (
                        <div className="successfulRegistration">
                            <p>Created Account!</p>
                        </div>
                    ) : ('')}

                    <p
                        ref={errRef} 
                        className={errMsg ? "errmsg" : "offscreen"}   aria-live="assertive">{errMsg}
                    </p>

                    <div className="register-link">
                        <p>Already have an account?</p> <Link to='/login'>Login</Link>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Register