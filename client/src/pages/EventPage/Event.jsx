import './Event.css';
import useFetch from '../../hooks/useFetch';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ConfirmTicket from '../../components/ConfirmTicket';

const Event = ({ auth }) => {
    const navigate = useNavigate();
    const { eventId } = useParams();
    const { data: eventData, loading: loadingEvents, error: errorEvents } = useFetch(`http://localhost:7000/events/${eventId}`);
    const { data: standsData, loading: loadingStands, error: errorStands, refetch: refetchStandsData } = useFetch(`http://localhost:7000/stands/of_event/${eventId}`);
    const [flagIconSrc, setFlagIconSrc] = useState('');
    const [circuitMapSrc, setCircuitMapSrc] = useState('');
    const [selectedStand, setSelectedStand] = useState(null);

    useEffect(() => {
        if (eventData && eventData.event && eventData.event.length > 0) {
            const event = eventData.event[0];
            if (event.flag_icon && event.flag_icon.data) {
                const flagIconBlob = new Blob([new Uint8Array(event.flag_icon.data)], { type: 'image/svg+xml' });
                const flagIconUrl = URL.createObjectURL(flagIconBlob);
                setFlagIconSrc(flagIconUrl);
            }
            if (event.circuit_map && event.circuit_map.data) {
                const circuitMapBlob = new Blob([new Uint8Array(event.circuit_map.data)], { type: 'image/svg+xml' });
                const circuitMapUrl = URL.createObjectURL(circuitMapBlob);
                setCircuitMapSrc(circuitMapUrl); 
            }            
        }
    }, [eventData]);

    const handleSelectStand = (stand) => {
        if (Object.keys(auth).length === 0) {
            // Redirect to login page if auth is empty
            navigate('/login');
        } else {
            setSelectedStand(stand);
        }
    };

    // Check if data is loading or if there's an error
    if (loadingEvents || loadingStands) {
        return <div>Loading...</div>;
    }

    if (errorEvents || errorStands) {
        return <div>Error: {error.message}</div>;
    }

    // Check if event data exists
    if (!eventData || !eventData.event || eventData.event.length === 0) {
        return <div>No event data found</div>;
    }

    // Access the event data inside the event array
    const event = eventData.event[0];

    return (
        <div>
            <div className="eventWrapper">
                <div className="eventTitle">
                    <h1 className="eventName">{event.event_name}</h1>   
                    <img src={flagIconSrc} alt="Country Flag" className="flagIcon" />
                </div>
                <div className="eventInfo">
                    <h2>{event.event_date}</h2>
                    <h2>{event.event_time}</h2>
                </div>
                <div className="eventContent">
                    <div className="leftContent">
                        <h2>{event.circuit_name}</h2>
                        {standsData.eventStands.map(stand =>(
                            <div key={stand.stand_id} className="standContainer">
                                <h3>{stand.stand_name}</h3>
                                <div className="standPrice">
                                    {stand.capacity === 0 ? (
                                        <h3>Sold out</h3>
                                    ) : (
                                        <>
                                            <h3>Price: {stand.price} €</h3>
                                            <button onClick={() => handleSelectStand(stand)}>SELECT</button>
                                        </>
                                    )}
                                </div>
                            </div>    
                        ))}
                    </div>
                    <div className="rightContent">
                        <img src={circuitMapSrc} alt='Circuit Map' className='circuitMap'/>
                    </div>
                </div>
            </div>
            {selectedStand && <ConfirmTicket stand={selectedStand} setSelected={setSelectedStand} event={event} user={auth}/>}
        </div>
    );
}

export default Event;
