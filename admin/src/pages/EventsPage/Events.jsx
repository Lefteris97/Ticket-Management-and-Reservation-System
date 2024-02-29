import './Events.css'
import { useState } from 'react'
import DataTable from '../../components/DataTable'
import AddEvent from '../../components/AddEvent'

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'img',
        headerName: 'Image',
        width: 100,
        renderCall: (params) =>{
            return <img src={params.row.img} alt="" />;
        }
    },
    {
        field: 'title',
        headerName: 'Title',
        type: 'string',
        width: 150,
        editable: true,
    },
    {
        field: 'inStock',
        headerName: 'In Stock',
        type: 'boolean',
        width: 110,
        editable: true,
    },
];

const Events = () =>{
    const [open, setOpen] = useState(false);

    return (
        <div className='events'>
            <div className="info">
                <h1>Events</h1>
                <button onClick={() => setOpen(true)}>Add New Event</button>
            </div>
            <DataTable slug="events" columns={columns}/>
            {open && <AddEvent slug="event" columns={columns} setOpen={setOpen}/>}
        </div>
    )
}

export default Events