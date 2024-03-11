import { useContext, useState } from 'react';
import '../EditUser/Edit.css'
import axios from 'axios';
import AuthContext from '../../context/AuthProvider';

const EditEvent = (props) =>{
    const { event } = props;
    const { auth } = useContext(AuthContext);
    
    // Check if event exists and has at least one item before accessing it
    if (!event || event.length === 0) {
        return <div>No event data available</div>;
    }

    const eventDetails = event[0];

    const [editedEvent, setEditedEvent] = useState(eventDetails);
    const [isEditing, setIsEditing] = useState(false);

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
        try {
            const response = await axios.put(
                `http://localhost:7000/events/${eventDetails.event_id}`, 
                editedEvent,
                {
                    headers: {
                        Authorization: `Bearer ${auth.accessToken}`
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
