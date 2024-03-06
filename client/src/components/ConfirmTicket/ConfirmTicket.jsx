import { useState } from 'react';
import './ConfirmTicket.css';
import Ticket from '../Ticket';
import axios from 'axios';

const ConfirmTicket = (props) => {
    const [reservationConfirmed, setReservationConfirmed] = useState(false);
    const [userTicket, setUserTicket] = useState(null);

    const handleConfirm = async () => {
        try {
            const response = await axios.post('http://localhost:7000/tickets', {
                event_id: props.event.event_id,
                stand_id: props.stand.stand_id,
                user_id: props.user.user_id
            });

            if (response.status === 201) {
                setReservationConfirmed(true);

                await fetchUserTicketForEvent(props.user.user_id, props.event.event_id);
            } 

        } catch (error) {
            console.error('Reservation failed', error);
            alert('Failed to confirm reservation. Please try again.');
        }
    };

    const fetchUserTicketForEvent = async (userId, eventId) => {
        try {
            const response = await axios.get(`http://localhost:7000/tickets/user/${userId}/event/${eventId}`);

            console.log(response.data);

            setUserTicket(response.data.ticket[0]); 
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="confirmTicket">
            <div className="confirmModal">
                {!reservationConfirmed ? (
                    <>
                        <h1>Buy Ticket for:</h1>
                        <h2>Event: {props.event.event_name}</h2>
                        <h2>Stand: {props.stand.stand_name}</h2>
                        <h2>Price: {props.stand.price} €</h2>
                        <div className="buttons">
                            <button className='cancelButton' onClick={() => props.setSelected(null)}>Cancel</button>
                            <button className='confirmButton' onClick={handleConfirm}>Confirm</button>
                        </div>
                    </>
                ) : (
                    userTicket && <Ticket userTicket={userTicket} setSelected={props.setSelected}/>
                )}
            </div>
        </div>
    );
};

export default ConfirmTicket;