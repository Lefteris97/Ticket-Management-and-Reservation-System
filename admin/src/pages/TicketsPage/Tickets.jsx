import './Tickets.css'
import { useState } from 'react'
import AddTicket from '../../components/AddTicket'
import DataTable from '../../components/DataTable'
import { ticketsColumns } from '../../dtsource';
import { ticketInputs } from '../../formSource';
import { AiOutlineReload } from "react-icons/ai";

const Tickets = () =>{
    const [open, setOpen] = useState(false);
    const [reloadComponent, setReloadComponent] = useState(false);

    const handleReloadComponent = () => {
        setReloadComponent(prevState => !prevState);
    };

    return (
        <div className='tickets'>
            <div className="info">
                <h1>Tickets</h1>
                <button onClick={() => setOpen(true)}>Add New Ticket</button>
                <AiOutlineReload size={22} onClick={handleReloadComponent}/>
            </div>
            <DataTable key={reloadComponent ? 'reload' : 'normal'} slug="tickets" columns={ticketsColumns}/>
            {open && <AddTicket slug="ticket" columns={ticketInputs} setOpen={setOpen}/>}
        </div>
    )
}

export default Tickets