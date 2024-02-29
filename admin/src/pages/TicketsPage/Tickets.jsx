import './Tickets.css'
import { useState } from 'react'
// import Add from '../../components/Add'
import DataTable from '../../components/DataTable'

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
        field: 'price',
        headerName: 'Price',
        type: 'number',
        width: 50,
        editable: true,
    },
    {
        field: 'soldOut',
        headerName: 'Sold Out',
        type: 'boolean',
        width: 110,
        editable: true,
    },
];

const Tickets = () =>{
    const [open, setOpen] = useState(false);

    return (
        <div className='tickets'>
            <div className="info">
                <h1>Tickets</h1>
                <button onClick={() => setOpen(true)}>Add New Ticket</button>
            </div>
            <DataTable slug="tickets" columns={columns}/>
            {open && <Add slug="ticket" columns={columns} setOpen={setOpen}/>}
        </div>
    )
}

export default Tickets