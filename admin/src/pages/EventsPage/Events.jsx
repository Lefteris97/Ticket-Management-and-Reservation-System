// import './Events.css'
// import { useState } from 'react'
// import DataTable from '../../components/DataTable'
// import AddEvent from '../../components/AddEvent'
// import { eventsColumns } from '../../dtsource'
// import { eventInputs } from '../../formSource'

// const Events = () =>{
//     const [open, setOpen] = useState(false);

//     return (
//         <div className='events'>
//             <div className="info">
//                 <h1>Events</h1>
//                 <button onClick={() => setOpen(true)}>Add New Event</button>
//             </div>
//             <DataTable slug="events" columns={eventsColumns}/>
//             {open && <AddEvent slug="event" columns={eventInputs} setOpen={setOpen}/>}
//         </div>
//     )
// }

// export default Events

import './Events.css'
import { useState } from 'react'
import DataTable from '../../components/DataTable'
import AddEvent from '../../components/AddEvent'
import { eventsColumns } from '../../dtsource'
import { eventInputs } from '../../formSource'
import { AiOutlineReload } from "react-icons/ai";

const Events = () =>{
    const [open, setOpen] = useState(false);
    const [reloadComponent, setReloadComponent] = useState(false);

    const handleReloadComponent = () => {
        setReloadComponent(prevState => !prevState);
    };

    return (
        <div className='events'>
            <div className="info">
                <h1>Events</h1>
                <button onClick={() => setOpen(true)}>Add New Event</button>
                <AiOutlineReload size={22} onClick={handleReloadComponent}/>
            </div>
            <DataTable key={reloadComponent ? 'reload' : 'normal'} slug="events" columns={eventsColumns}/>
            {open && <AddEvent slug="event" columns={eventInputs} setOpen={setOpen}/>}
        </div>
    )
}

export default Events