import Email from '../../components/EmailForm/Email'
import './Contact.css'
import { BsTelephone } from "react-icons/bs";

const Contact = () =>{

    return (
        <div>
            <div className="contactContainer">
                <h1>Contact us</h1>
                <div className="phoneInfo">
                    <h3>Need help?</h3>
                    <BsTelephone size={21}/>
                    <h3>+44 20 3984 9372</h3>
                </div>
            </div>
            <hr className='contactLine'/>
            <Email/>
        </div>   
    )
}

export default Contact