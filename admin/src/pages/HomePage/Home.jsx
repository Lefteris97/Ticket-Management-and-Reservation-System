import BarChartBox from '../../components/BarChartBox'
import PieChartBox from '../../components/PieChartBox/PieChartBox'
import { barChartBoxVisit, pieChartBoxVisit } from '../../dtsource'
import './Home.css'

const Home = () =>{
    return (
        <div className='home'>
            <h1>Home Page</h1>
            <div className="boxContainer">
                <div className="box box1"><BarChartBox {...barChartBoxVisit}/></div>
                <div className="box box2"><PieChartBox {...pieChartBoxVisit} /></div>
            </div>
            
        </div>
    )
}

export default Home