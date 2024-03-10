import '../EventPage/Event.css'
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import EditTicket from '../../components/EditTicket';

const Ticket = () =>{

    const { id } = useParams();

    const { data, loading, error } = useFetch(`http://localhost:7000/tickets/${id}`);

    if (loading) {
        return <div>Loading user data...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="event">
            {data && <EditTicket {...data}/>}
        </div>
    )
}

export default Ticket