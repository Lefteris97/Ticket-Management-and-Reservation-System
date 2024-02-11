import './Home.css'
import useFetch from "../../hooks/useFetch"
import wallpaper from "../../assets/photos/lights-out.jpg"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react";

const Home = () => {
    const { data, loading, error } = useFetch('http://localhost:7000/events');
    const [eventsWithPhotos, setEventsWithPhotos] = useState([]);

    useEffect(() => {
        if (!loading && !error && data && data.events) {
            const updatedEvents = data.events.map(async event => {
                try {
                    // Convert the photo data to a Blob object
                    const photoBlob = event.photo && event.photo.data ? new Blob([new Uint8Array(event.photo.data)], { type: 'image/*' }) : null;
    
                    // Read the photo Blob and convert it to a Base64-encoded string
                    const photoBase64String = photoBlob ? await blobToBase64(photoBlob) : null;
    
                    // Convert the flag icon data to a Blob object
                    const flagIconBlob = event.flag_icon && event.flag_icon.data ? new Blob([new Uint8Array(event.flag_icon.data)], { type: 'image/svg+xml' }) : null;

                    // Read the flag icon Blob and convert it to a Base64-encoded string
                    const flagIconBase64String = flagIconBlob ? await blobToBase64(flagIconBlob) : null;
    
                    console.log("Flag Icon Base64 String:", flagIconBase64String); // Log the flag icon Base64 string
                    
                    return {
                        ...event,
                        photoBase64: photoBase64String,
                        flagIconBase64: flagIconBase64String
                    };
                } catch (error) {
                    console.error("Error while encoding photo data:", error);
                    return event;
                }
            });
            Promise.all(updatedEvents).then(events => setEventsWithPhotos(events));
        }
    }, [data, loading, error]);
    
    // Function to convert a Blob to a Base64-encoded string
    const blobToBase64 = (blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    };

    // Check if data is loading or if there's an error
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <img src={wallpaper} className="homepage-image" />
            <h2 className="home-title">2024 FIA FORMULA ONE WORLD CHAMPIONSHIP</h2>
            <hr className="home-line" />
            <ul className="events_list">
                {eventsWithPhotos
                    .filter(event => !event.Sold_out) // Filter events that have happened
                    .map(event => (
                        <Link to={`/gp/${event.event_id}`} key={event.event_id} className="events_items">
                            <li>
                                <img src={event.photoBase64} alt="event photo" className="event_image" />
                                <div className="event_header">
                                    <h2>{event.event_name}</h2>
                                    <img src={event.flagIconBase64} alt="country flag" className="flag_icon" />
                                </div>
                                <div className="event_info">
                                    <p>{event.circuit_name}</p>
                                    <p>{event.event_date}</p>
                                </div>
                                {/* <p>Sold Out: {event.Sold_out ? 'Yes' : 'No'}</p> */}
                            </li>
                        </Link>
                ))}
            </ul>
        </>
    );
}

export default Home;
