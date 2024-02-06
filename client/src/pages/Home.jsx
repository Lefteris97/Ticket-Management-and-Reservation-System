import useFetch from "../hooks/useFetch"

const Home = () =>{
    const {data, loading, error} = useFetch('http://localhost:7000/events')

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    // if (error) {
    //     return <div>Error: {error.message}</div>;
    // }

    return (
        <div className="test">
            {loading ? (
                "Loading..."
            ) : (
                <>
                    <h1>Home</h1>
                    <ul>
                        {data.events && data.events.map(event => (
                            <li key={event.event_id}>
                                <h2>{event.event_name}</h2>
                                <p>Event ID: {event.event_id}</p>
                                <p>Circuit Name: {event.circuit_name}</p>
                                <p>Event Date: {event.event_date}</p>
                                <p>Sold Out: {event.Sold_out ? 'Yes' : 'No'}</p>
                                {/* Render other properties as needed */}
                            </li>
                        ))}
                     </ul>
                </>
            )}
        </div>
    )
}

export default Home