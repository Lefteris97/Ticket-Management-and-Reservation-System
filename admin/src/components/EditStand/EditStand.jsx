import { useContext, useState } from 'react';
import '../EditUser/Edit.css'
import axios from 'axios';
import AuthContext from '../../context/AuthProvider';

const EditStand = (props) =>{
    const { stand } = props;
    const { auth } = useContext(AuthContext);
    
    // Check if stand exists and has at least one item before accessing it
    if (!stand || stand.length === 0) {
        return <div>No event data available</div>;
    }

    const standDetails = stand[0];

    const [editedStand, setEditedStand] = useState(standDetails);
    const [isEditing, setIsEditing] = useState(false);

    // Function to handle input changes and update editedEvent state
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedStand((prevStand) => ({
            ...prevStand,
            [name]: value,
        }));
    };

    // Function to handle update button click
    const handleUpdateClick = async () => {
        try {
            const response = await axios.put(
                `http://localhost:7000/stands/${standDetails.stand_id}`, 
                editedStand,
                {
                    headers: {
                        Authorization: `Bearer ${auth.accessToken}`
                    }
                }
            );
            
            console.log('Stand updated:', response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="itemPage">
            <div className="info">
                <div className="infoHeader">
                    <h1>{standDetails.stand_name}</h1>
                    <button onClick={handleUpdateClick}>Update</button>
                </div> 
                <div className="details">
                {Object.entries(standDetails)
                    .map(([key, value]) => (
                        <div className="item" key={key}>
                            {key === 'stand_id' ? (
                                <>
                                    <span className="itemTitle">{key}:</span>
                                    <span className="itemValue">{standDetails[key]}</span>
                                </>
                            ) : (
                                <>
                                    <span className="itemTitle">{key}:</span>
                                    <input
                                        className="itemValue"
                                        type="text"
                                        name={key}
                                        value={isEditing ? editedStand[key] || "" : value}
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

export default EditStand;
