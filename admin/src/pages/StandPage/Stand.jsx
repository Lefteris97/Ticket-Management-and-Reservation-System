import '../EventPage/Event.css'
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import EditStand from '../../components/EditStand';

const Stand = () =>{

    const { id } = useParams();

    const { data, loading, error } = useFetch(`http://localhost:7000/stands/${id}`);

    if (loading) {
        return <div>Loading user data...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="event">
            {data && <EditStand {...data}/>}
        </div>
    )
}

export default Stand