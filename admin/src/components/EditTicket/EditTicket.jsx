import { useState } from 'react';
import '../EditUser/Edit.css'
import axios from 'axios';

const EditTicket = (props) =>{
    const { ticket } = props;
    
    // Check if ticket exists and has at least one item before accessing it
    if (!ticket || ticket.length === 0) {
        return <div>No event data available</div>;
    }

    const ticketDetails = ticket[0];

    // Function to handle input changes and update editedTicket state
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedTicket((prevTicket) => ({
            ...prevTicket,
            [name]: value,
        }));
    };

    const [editedTicket, setEditedTicket] = useState(ticketDetails);

    // Function to handle update button click
    const handleUpdateClick = async () => {
        try {
            const response = await axios.put(`http://localhost:7000/tickets/${ticketDetails.ticket_id}`, editedTicket);
            console.log('Ticket updated:', response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="itemPage">
            <div className="info">
                <div className="infoHeader">
                    <h1>Ticket: {ticketDetails.ticket_id}</h1>
                    <button onClick={handleUpdateClick}>Update</button>
                </div> 
                <div className="details">
                {Object.entries(ticketDetails)
                    .map(([key, value]) => (
                        <div className="item" key={key}>
                            {key === 'ticket_id' ? (
                                <>
                                    <span className="itemTitle">{key}:</span>
                                    <span className="itemValue">{ticketDetails[key]}</span>
                                </>
                            ) : (
                                <>
                                    <span className="itemTitle">{key}:</span>
                                    <input
                                        className="itemValue"
                                        type="text"
                                        name={key}
                                        value={editedTicket[key] || value}
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

export default EditTicket;
