import { useState } from 'react';
import './Edit.css'
import axios from 'axios';

const EditUser = (props) =>{
    const { user } = props;
    
    // Check if user exists and has at least one item before accessing it
    if (!user || user.length === 0) {
        return <div>No user data available</div>;
    }

    const userDetails = user[0];
    console.log('userdet: ', userDetails);

    // Function to handle input changes and update editedUser state
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const [editedUser, setEditedUser] = useState(userDetails);

    // Function to handle update button click
    const handleUpdateClick = async () => {
        try {
            console.log('edited user: ', editedUser);
            const response = await axios.put(`http://localhost:7000/users/${userDetails.user_id}`, editedUser);
            console.log('User updated:', response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="itemPage">
            <div className="info">
                <div className="infoHeader">
                    <h1>{userDetails.fname}  {userDetails.lname}</h1>
                    <button onClick={handleUpdateClick}>Update</button>
                </div>
                <div className="details">
                    {Object.entries(userDetails).map(([key, value]) => (
                        <div className="item" key={key}>
                            {key === 'user_id' || key === 'google_id' || key === 'created_at' ? (
                                <>
                                    <span className="itemTitle">{key}:</span>
                                    <span className="itemValue">{userDetails[key]}</span>
                                </>
                            ) : (
                                <>
                                    <span className="itemTitle">{key}:</span>
                                    <input
                                        className="itemValue"
                                        type="text"
                                        name={key}
                                        value={editedUser[key] || value} // Display edited value if available
                                        onChange={handleInputChange}
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

export default EditUser;
