import { useContext, useState } from 'react';
import '../AddUser/Add.css'
import { AiOutlineCloseCircle } from "react-icons/ai";
import { ImFolderUpload } from "react-icons/im";
import axios from 'axios';
import AuthContext from '../../context/AuthProvider';

const AddEvent = (props) =>{
    const [file, setFile] = useState("");
    const [info, setInfo] = useState({});
    const { auth } = useContext(AuthContext);

    const handleChange = (e) =>{
        setInfo(prev => ({...prev, [e.target.id]: e.target.value}));
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        // const data = new FormData();
        // data.append("file", file);
        // data.append("upload_preset", "upload");

        //add new event
        try {

            // const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dcc6c33dc/image/upload", data);
            // console.log(uploadRes.data);
            // const { url } = uploadRes.data;
            const newEvent = {
                ...info,
                // img: url,
            };

            await axios.post(
                "http://localhost:7000/events",
                newEvent,
                {
                    headers: {
                        Authorization: `Bearer ${auth.accessToken}`
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
                                id="file"
                                onChange={(e) => setFile(e.target.files[0])}
                                // style={{ display: "none" }}
                            />
                        </div>
                        <div className="photoUpload">
                            <label htmlFor="file">
                                Event Photo: <ImFolderUpload size={22} className='uploadIcon'/>
                            </label>
                            <input
                                type="file"
                                id="file"
                                onChange={(e) => setFile(e.target.files[0])}
                                // style={{ display: "none" }}
                            />
                        </div>
                        <div className="circuitUpload">
                            <label htmlFor="file">
                                Circuit Image: <ImFolderUpload size={22} className='uploadIcon'/>
                            </label>
                            <input
                                type="file"
                                id="file"
                                onChange={(e) => setFile(e.target.files[0])}
                                // style={{ display: "none" }}
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