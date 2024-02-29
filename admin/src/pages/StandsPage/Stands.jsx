import './Stands.css'
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
        field: 'soldOut',
        headerName: 'Sold Out',
        type: 'boolean',
        width: 110,
        editable: true,
    },
];

const Stands = () =>{
    const [open, setOpen] = useState(false);

    return (
        <div className='stands'>
            <div className="info">
                <h1>Stands</h1>
                <button onClick={() => setOpen(true)}>Add New Stand</button>
            </div>
            <DataTable slug="stands" columns={columns}/>
            {open && <Add slug="stand" columns={columns} setOpen={setOpen}/>}
        </div>
    )
}

export default Stands