import { useState } from 'react';
import '../AddUser/Add.css'
import { AiOutlineCloseCircle } from "react-icons/ai";
import axios from 'axios';

const AddTicket = (props) =>{

    const [info, setInfo] = useState({});

    const handleChange = (e) =>{
        setInfo(prev => ({...prev, [e.target.id]: e.target.value}));
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        //add new item
        try {
            const newTicket = {
                ...info
            }

            await axios.post("http://localhost:7000/tickets", newTicket);
            
            props.setOpen(false); 
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="add">
            <div className="modal">
                <span className="close" onClick={() => props.setOpen(false)}><AiOutlineCloseCircle size={22}/></span>
                <h1>Add new {props.slug}</h1>
                <form onSubmit={handleSubmit}>
                    {props.columns.map(column => {
                            return (
                                <div className="item" key={column.id}>
                                    <label>{column.label}</label>
                                    <input onChange={handleChange} type={column.type} placeholder={column.placeholder} id={column.id}/>
                                </div>
                            );
                    })}
                    <button>Save</button>
                </form>
            </div>
        </div>
    )
}

export default AddTicket