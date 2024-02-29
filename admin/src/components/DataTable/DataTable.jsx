import { Link, useLocation } from 'react-router-dom';
import './DataTable.css'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import useFetch from '../../hooks/useFetch'
import { useEffect, useState } from 'react';
import axios from 'axios';

const DataTable = (props) =>{
    const location = useLocation();
    const path = location.pathname.split("/")[1];
    const [list, setList] = useState([]);
    const {data, loading, error} = useFetch(`http://localhost:7000/${path}`);

    console.log(data);
    console.log(`http://localhost:7000/${path}`);

    useEffect(() =>{
        if (data && data[path]){
            setList(data[path])
        }
    }, [data]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (list.length === 0) {
        return <div>No data available</div>;
    }

    const uniqueIdentifier = Object.keys(list[0])[0];
    
    const handleDelete = async (id) =>{
        try {
            // console.log('ID: ', id);
            await axios.delete(`http://localhost:7000/${path}/${id}`);
            
            setList((prevList) => prevList.filter((item) => item[uniqueIdentifier] !== id));
        } catch (error) {
            console.log(error);
        }
    };

    const actionColumn = {
        field: "action",
        headerName: "Action",
        width: 80,
        renderCell: (params) =>{
            // console.log('params: ', params);
            return (
                <div className="action">
                    <Link to={`/${props.slug}/${params.row.id}`}>
                        <BiEdit size={22} color='#4d79ff'/>
                    </Link>
                    <div className="delete" onClick={()=>handleDelete(params.row[uniqueIdentifier])}>
                        <AiOutlineDelete size={22} color='#cc0000'/>
                    </div>
                </div>
            )
        }
    }
    
    return (
        <div className="dataTable">
            <DataGrid 
                className='dataGrid'
                // rows={props.rows}
                rows={list}
                columns={[...props.columns, actionColumn]}
                initialState={{
                pagination: {
                    paginationModel: {
                    pageSize: 10,
                    },
                },
                }}
                slots={{toolbar: GridToolbar}}
                slotProps={{
                    toolbar:{
                        showQuickFilter: true,
                        quickFilterProps: {debounceMs: 500}
                    }
                }}
                pageSizeOptions={[10]}
                checkboxSelection
                disableRowSelectionOnClick
                disableColumnFilter
                disableDensitySelector
                disableColumnSelector
                getRowId={(row) => row[uniqueIdentifier]}
            />
        </div>
    )
}

export default DataTable