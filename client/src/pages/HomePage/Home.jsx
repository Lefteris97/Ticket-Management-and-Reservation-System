import './Home.css'
import useFetch from "../../hooks/useFetch"
import wallpaper from "../../assets/photos/lights-out.jpg"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react";

const Home = () => {
    const { data, loading, error } = useFetch('http://localhost:7000/events');

    const [events, setEvents] = useState([]);

    useEffect(() => {
        if (data && data.events && Array.isArray(data.events)) {
            setEvents(data.events);
        }
    }, [data]);

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
            <h1 className="home-title">2024 FIA FORMULA ONE WORLD CHAMPIONSHIP</h1>
            <hr className="home-line" />
            <ul className="events_list">
                {events
                    .filter(event => !event.completed) // Filter events that have happened
                    .map(event => (
                        <Link to={`/gp/${event.event_id}`} key={event.event_id} className="events_items">
                            <li key={event.event_id}>
                                <img src={`http://localhost:7000/${event.photo}`} alt="event photo" className="event_image" />
                                <div className="event_header">
                                    <h2>{event.event_name}</h2>
                                    <img src={`http://localhost:7000/${event.flag_icon}`}  alt="country flag" className="flag_icon" />
                                </div>
                                <div className="event_info">
                                    <p>{event.circuit_name}</p>
                                    <p>{event.event_date}</p>
                                </div>
                            </li>
                        </Link>
                ))}
            </ul>
        </>
    );
}

export default Home;
