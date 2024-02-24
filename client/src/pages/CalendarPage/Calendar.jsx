import { useEffect, useState } from 'react';
import './Calendar.css'
import { generateDate, currentDate, months } from './DateGenerator'
import { GrCaretUp, GrCaretDown, GrFormRefresh } from "react-icons/gr";
import useFetch from '../../hooks/useFetch';

import dayjs from 'dayjs';


const Calendar = () =>{
    const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    const [today, setToday] = useState(currentDate);
    const [selectDate, setSelectDate] = useState(currentDate);

    // const { data, loading, error } = useFetch('http://localhost:7000/events');

    // console.log(data);

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:7000/events');
                const data = await response.json();
                setEvents(data.events);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
    
        fetchData();
    }, []);

    const isSameDay = (eventDate, selectedDate) => {
        const addYearToDate = eventDate.concat(" ", "2024"); 
        const dFormat = dayjs(addYearToDate)
        // console.log('dFormat: ', dFormat);
        // console.log('s day: ', selectedDate);
        return dFormat.isSame(selectedDate, 'day');
    };

    // Check if data is loading or if there's an error
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

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
                        <GrCaretUp size={28} onClick={() =>{
                            setToday(today.month(today.month() - 1));
                        }}/>
                        <GrCaretDown size={28} onClick={() =>{
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
                                                ${date.isSame(selectDate, 'day') ? 'selectedDate' : ''}
                                                ${events.some(event => isSameDay(event.event_date, date)) ? 'raceDay' : ''}`}
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
                <ol>
                    {events
                        .filter(event => isSameDay(event.event_date, selectDate))
                        .map((event, index) => (
                            <li key={event.event_id}>
                                
                                <h2>{event.event_name}</h2> 
                                <h3>Circuit: {event.circuit_name}</h3>

                                {!event.Sold_out ? (
                                    <>
                                        <h3>Time: {event.event_time}</h3>
                                        <h3>Availability: {event.availability}</h3>
                                        <h3>Reservation: {event.reservation}</h3>
                                    </>
                                ) : (
                                    <h3>Total attendees: {event.total_attendees}</h3>
                                )}
                            </li>
                    ))}
                </ol>
            </div>
        </div>
    )
}

export default Calendar