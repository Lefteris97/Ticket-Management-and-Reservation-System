import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import './PieChartBox.css'

const PieChartBox = (props) =>{
    return (
        <div className="pieChartBox">
            <h1>{props.title}</h1>
            <div className="pieChart">
            <ResponsiveContainer width="99%" height={300}>
                <PieChart>
                    <Tooltip
                        contentStyle={{ background: "white", borderRadius: "5px" }}
                    />
                    <Pie
                        data={props.pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={props.name}
                        outerRadius={120}
                        dataKey="value"
                    >
                    {props.pieData.map((item) => (
                        <Cell key={item.name} fill={item.color} />
                    ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
            </div>
            <div className="options">
                {props.pieData.map((item)=>(
                    <div className="option" key={item.name}>
                        <div className="title">
                            <div className="dot" style={{backgroundColor: item.color}}/>
                            <span>{item.name}</span>
                        </div>
                        <span>{item.value}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PieChartBox