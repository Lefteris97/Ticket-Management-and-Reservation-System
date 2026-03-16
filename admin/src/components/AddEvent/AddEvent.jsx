import { useContext, useState } from 'react';
import '../AddUser/Add.css'
import { AiOutlineCloseCircle } from "react-icons/ai";
import { ImFolderUpload } from "react-icons/im";
import axios from 'axios';
import AuthContext from '../../context/AuthProvider';

const AddEvent = (props) =>{
    const [flagIcon, setFlagIcon] = useState('');
    const [photo, setPhoto] = useState('');
    const [circuitMap, setCircuitMap] = useState('');
    const [info, setInfo] = useState({});
    const { auth } = useContext(AuthContext);

    const handleChange = (e) =>{
        setInfo(prev => ({...prev, [e.target.id]: e.target.value}));
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        const formData = new FormData();

        formData.append('flag_icon', flagIcon);
        formData.append('photo', photo);
        formData.append('circuit_map', circuitMap);

        // Append other form data
        Object.keys(info).forEach(key => {
            formData.append(key, info[key]);
        });

        //add new event
        try {
            await axios.post(
                "http://localhost:7000/events",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${auth.accessToken}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            
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
                    <div className="uploadImages">
                        <div className="flagUpload">
                            <label htmlFor="file">
                                Flag Icon: <ImFolderUpload size={22} className='uploadIcon'/>
                            </label>
                            <input
                                type="file"
                                id="flag_icon"
                                onChange={(e) => setFlagIcon(e.target.files[0])}
                            />
                        </div>
                        <div className="photoUpload">
                            <label htmlFor="file">
                                Event Photo: <ImFolderUpload size={22} className='uploadIcon'/>
                            </label>
                            <input
                                type="file"
                                id="photo"
                                onChange={(e) => setPhoto(e.target.files[0])}
                            />
                        </div>
                        <div className="circuitUpload">
                            <label htmlFor="file">
                                Circuit Image: <ImFolderUpload size={22} className='uploadIcon'/>
                            </label>
                            <input
                                type="file"
                                id="circuit_map"
                                onChange={(e) => setCircuitMap(e.target.files[0])}
                            />
                        </div>
                    </div>
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

export default AddEvent