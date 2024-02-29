import './Users.css'
import { userColumns } from '../../dtsource'
import { useState } from 'react'
import AddUser from '../../components/AddUser'
import DataTable from '../../components/DataTable'
import { userInputs } from '../../formSource'

const Users = () =>{

    const [open, setOpen] = useState(false);

    return (
        <div className='users'>
            <div className="info">
                <h1>Users</h1>
                <button onClick={() => setOpen(true)}>Add New User</button>
            </div>
            <DataTable slug="users" columns={userColumns}/>
            {open && <AddUser slug="user" inputs={userInputs} setOpen={setOpen}/>}
        </div>
    )
}

export default Users