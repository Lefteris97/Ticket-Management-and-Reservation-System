import { useState } from 'react';
import './Calendar.css'
import { generateDate, currentDate, months } from './DateGenerator'
import { GrCaretUp, GrCaretDown, GrFormRefresh } from "react-icons/gr";

const Calendar = () =>{
    const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    const [today, setToday] = useState(currentDate);
    const [selectDate, setSelectDate] = useState(currentDate);

    return (
        <div className="calContainer">
            <div>
                <div className="calTitle">
                    <div className="resetDate">
                        <GrFormRefresh className='grometIcons' size={32} onClick={() =>{
                            setToday(currentDate);
                        }}/>
                    </div>
                    <div className="displayedMonth">
                        <h1>{months[today.month()]} {today.year()}</h1>
                    </div>
                    <div className='grommetWrapper'>
                        <GrCaretUp className='grometIcons' size={28} onClick={() =>{
                            setToday(today.month(today.month() - 1));
                        }}/>
                        <GrCaretDown className='grometIcons' size={28} onClick={() =>{
                            setToday(today.month(today.month() + 1));
                        }}/>
                    </div>
                </div>
                <div className="days">
                    {days.map((day, index) => (
                        <h1 key={index} className='dayItem'>{day}</h1>
                    ))}
                </div>
                <div className="dateGrid">
                    {generateDate(today.month(), today.year()).map(({ date, currentMonth, today }, index) => (
                        <h1 key={index} 
                            className={`dateItem ${currentMonth ? '' : 'notCurrentMonth'} 
                                                ${today ? 'today' : ''}
                                                ${date.isSame(selectDate, 'day') ? 'selectedDate' : ''}`}
                            onClick={()=>{
                                setSelectDate(date);
                            }}
                        >
                            <span className='dateNum'>{date.date()}</span>
                        </h1>
                    ))}
                </div>
            </div>
            <div className='info'>
                <h1 className='infoTitle'>Schedule for {selectDate.toDate().toDateString()}</h1>
                {/* <h2>{today.toDate().toDateString()}</h2> */}
            </div>
        </div>
    )
}

export default Calendar