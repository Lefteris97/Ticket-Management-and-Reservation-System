import './Email.css'
import { useRef } from 'react';
import emailjs from '@emailjs/browser';

const Email = () =>{
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

    emailjs
      .sendForm('service_tds3x9c', 'template_hwbshja', form.current, {
        publicKey: 'B2Oibagmw0eSRdHrg',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          e.target.reset();
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
    };

    return (
        <form ref={form} onSubmit={sendEmail}>
            <label>Name</label>
            <input type="text" name="user_name" required/>
            <label>Email</label>
            <input type="email" name="user_email" required/>
            <label>Message</label>
            <textarea name="message" required/>
            <input type="submit" value="Send" />
        </form>
    );
};

export default Email