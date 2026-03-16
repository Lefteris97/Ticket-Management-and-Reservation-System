import './Event.css'
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import EditEvent from '../../components/EditEvent';

const Event = () =>{

    const { id } = useParams();

    const { data, loading, error } = useFetch(`http://localhost:7000/events/${id}`);

    if (loading) {
        return <div>Loading user data...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="event">
            {data && <EditEvent {...data}/>}
        </div>
    )
}

export default Event