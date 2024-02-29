import './User.css'
import ItemPage from '../../components/ItemPage/ItemPage'

const singleUser = {
    fname: 'Moses',
    lname: 'Wright',
};

const User = () =>{

    //Fetch data and send to item page
    return (
        <div className="user">
            {/* <ItemPage/> */}
            <ItemPage {...singleUser}/>
        </div>
    )
}

export default User