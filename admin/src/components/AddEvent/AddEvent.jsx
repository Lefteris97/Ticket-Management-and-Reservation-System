import './Add.css'
import { AiOutlineCloseCircle } from "react-icons/ai";

const AddEvent = (props) =>{

    const handleSubmit = (e) =>{
        e.preventDefault();

        //add new item
        //axios.post(`api/${slug}s`, {})
    };

    return (
        <div className="add">
            <div className="modal">
                <span className="close" onClick={() => props.setOpen(false)}><AiOutlineCloseCircle size={22}/></span>
                <h1>Add new {props.slug}</h1>
                <form onSubmit={handleSubmit}>
                    {props.columns
                        // .filter(item => item.field !== "id" && item.field !== "fullName" )
                        .map(column => {
                            return (
                                <div className="item" key={column.id}>
                                    <label>{column.label}</label>
                                    <input type={column.type} placeholder={column.placeholder} />
                                </div>
                            );
                        })
                    }
                    <button>Save</button>
                </form>
            </div>
        </div>
    )
}

export default AddEvent