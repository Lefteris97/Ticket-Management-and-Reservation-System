import './Event.css'
import useFetch from '../../hooks/useFetch'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Event = () => {
    const { eventId } = useParams();
    const { data, loading, error } = useFetch(`http://localhost:7000/events/${eventId}`);
    // const [photoSrc, setPhotoSrc] = useState('');
    const [flagIconSrc, setFlagIconSrc] = useState('');
    const [circuitMapSrc, setCircuitMapSrc] = useState('');

    console.log(data);

    useEffect(() => {
        if (data && data.event && data.event.length > 0) {
            const event = data.event[0];
            // if (event.photo && event.photo.data) {
            //     const photoBlob = new Blob([new Uint8Array(event.photo.data)], { type: 'image/*' });
            //     const photoUrl = URL.createObjectURL(photoBlob);
            //     setPhotoSrc(photoUrl);
            // }
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
    }, [data]);

    // Check if data is loading or if there's an error
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    // Check if event data exists
    if (!data || !data.event || data.event.length === 0) {
        return <div>No event data found</div>;
    }

    // Access the event data inside the event array
    const event = data.event[0];

    return (
        <div>
            {/* <div className="eventContainer"> */}
                <div className="eventWrapper">
                    <div className="eventTitle">
                        <h1 className="eventName">{event.event_name}</h1>   
                        <img src={flagIconSrc} alt="Country Flag" className="flagIcon" />
                    </div>
                    <h2 className="eventDate">{event.event_date}</h2>
                    <div className="eventContent">
                        <div className="leftContent">
                            {/* <h2 className="circuitName">{event.circuit_name}</h2> */}
                            <h2>HERE ARE THE STANDS FOR THE CIRCUIT</h2>
                        </div>
                        {/* <img src={photoSrc} alt="Event Image" className="eventImage"/> */}
                        <div className="rightContent">
                            <h2 className="circuitName">{event.circuit_name}</h2>
                            <img src={circuitMapSrc} alt='Circuit Map' className='circuitMap'/>
                        </div>
                    </div>
                </div>
            {/* </div> */}
        </div>
    );
}

export default Event;
