import './Stands.css'
import { useState } from 'react'
import DataTable from '../../components/DataTable'
import { standsColumns } from '../../dtsource';
import { standInputs } from '../../formSource';
import AddStand from '../../components/AddStand';
import { AiOutlineReload } from "react-icons/ai";

const Stands = () =>{
    const [open, setOpen] = useState(false);
    const [reloadComponent, setReloadComponent] = useState(false);

    const handleReloadComponent = () => {
        setReloadComponent(prevState => !prevState);
    };

    return (
        <div className='stands'>
            <div className="info">
                <h1>Stands</h1>
                <button onClick={() => setOpen(true)}>Add New Stand</button>
                <AiOutlineReload size={22} onClick={handleReloadComponent}/>
            </div>
            <DataTable key={reloadComponent ? 'reload' : 'normal'}  slug="stands" columns={standsColumns}/>
            {open && <AddStand slug="stand" columns={standInputs} setOpen={setOpen}/>}
        </div>
    )
}

export default Stands