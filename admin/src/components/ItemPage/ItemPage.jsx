import './ItemPage.css'

const ItemPage = (props) =>{
    return (
        <div className="itemPage">
            <div className="info">
                <div className="infoHeader">
                    <h1>{props.fname}  {props.lname}</h1>
                    <button>Update</button>
                </div>
                <div className="details">
                    <div className="item">
                        <span className="itemTitle">Username:</span>
                        <span className="itemValue">John</span>
                    </div>
                    <div className="item">
                        <span className="itemTitle">Username:</span>
                        <span className="itemValue">John</span>
                    </div>
                    <div className="item">
                        <span className="itemTitle">Username:</span>
                        <span className="itemValue">John</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemPage