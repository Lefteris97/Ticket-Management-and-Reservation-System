import { useContext, useState } from 'react';
import '../EditUser/Edit.css'
import './EditEvent.css'
import axios from 'axios';
import AuthContext from '../../context/AuthProvider';
import { ImFolderUpload } from "react-icons/im";

const EditEvent = (props) =>{
    const { event } = props;
    const { auth } = useContext(AuthContext);
    
    // Check if event exists and has at least one item before accessing it
    if (!event || event.length === 0) {
        return <div>No event data available</div>;
    }

    const eventDetails = event[0];

    console.log(eventDetails)

    const [editedEvent, setEditedEvent] = useState(eventDetails);
    const [isEditing, setIsEditing] = useState(false);

    const [flagIcon, setFlagIcon] = useState(eventDetails.flag_icon);
    const [photo, setPhoto] = useState(eventDetails.photo);
    const [circuitMap, setCircuitMap] = useState(eventDetails.circuit_map);

    // // Function to handle input changes and update editedEvent state
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedEvent((prevEvent) => ({
            ...prevEvent,
            [name]: value,
        }));
    };

    // // Function to handle update button click
    const handleUpdateClick = async () => {
        const formData = new FormData();

        // Append new images if they are selected
        if (flagIcon instanceof File) {
            formData.append('flag_icon', flagIcon);
        }
        if (photo instanceof File) {
            formData.append('photo', photo);
        }
        if (circuitMap instanceof File) {
            formData.append('circuit_map', circuitMap);
        }

        // Append other form data
        Object.entries(editedEvent).forEach(([key, value]) => {
            formData.append(key, value);
        });

        try {
            const response = await axios.put(
                `http://localhost:7000/events/${eventDetails.event_id}`, 
                // editedEvent,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${auth.accessToken}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            
            console.log('Event updated:', response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="itemPage">
            <div className="info">
                <div className="infoHeader">
                    <h1>{eventDetails.event_name}</h1>
                    <button onClick={handleUpdateClick}>Update</button>
                </div> 
                <div className="flagUpload">
                    <label htmlFor="file">
                        Flag Icon: <ImFolderUpload size={22} className='uploadIcon'/>
                    </label>
                    <input
                        type="file"
                        id="flag_icon"
                        onChange={(e) => setFlagIcon(e.target.files[0])}
                    />
                    <div className="imageContainer">
                        <span>Current Image: </span>
                        <img src={`http://localhost:7000/${eventDetails.flag_icon}`} alt=""/>
                    </div>
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
                    <div className="imageContainer">
                        <span>Current Image: </span>
                        <img src={`http://localhost:7000/${eventDetails.photo}`} alt=""/>
                    </div>
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
                    <div className="imageContainer">
                        <span>Current Image: </span>
                        <img src={`http://localhost:7000/${eventDetails.circuit_map}`} alt=""/>
                    </div>
                </div>
                <div className="details">
                    {Object.entries(eventDetails)
                        .filter(([key, value]) => !['flag_icon', 'circuit_map', 'photo'].includes(key))
                        .map(([key, value]) => (
                            <div className="item" key={key}>
                                {key === 'event_id' ? (
                                    <>
                                        <span className="itemTitle">{key}:</span>
                                        <span className="itemValue">{eventDetails[key]}</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="itemTitle">{key}:</span>
                                        <input
                                            className="itemValue"
                                            type="text"
                                            name={key}
                                            value={isEditing ? editedEvent[key] || "" : value}
                                            onChange={handleInputChange}
                                            onFocus={() => setIsEditing(true)}
                                            onBlur={() => setIsEditing(false)}
                                        />
                                    </>
                                )}
                            </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default EditEvent;
