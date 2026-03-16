import { useEffect, useState } from 'react';
import './Calendar.css'
import { generateDate, currentDate, months } from './DateGenerator'
import { GrCaretUp, GrCaretDown, GrFormRefresh } from "react-icons/gr";
import useFetch from '../../hooks/useFetch';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import Ticket from '../../components/Ticket';

const Calendar = ({auth}) =>{
    const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    const [userTicket, setUserTicket] = useState(null);
    const [ticketFetched, setTicketFetched] = useState(false);
    const [open, setOpen] = useState(false);

    const [today, setToday] = useState(currentDate);
    const [selectDate, setSelectDate] = useState(currentDate);
    const [totalAttendees, setTotalAttendees] = useState(0);

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

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

    useEffect(() => {
        const fetchTotalAttendees = async (eventId) => {
            try {
                const response = await fetch(`http://localhost:7000/tickets/attendees/${eventId}`);
                const data = await response.json();

                setTotalAttendees(data.totalAttendees); // Update state with the fetched totalAttendees value
            } catch (error) {
                console.error("Error fetching total attendees:", error);
                setTotalAttendees(0); // Set totalAttendees to 0 in case of an error
            }
        };
    
        // Fetch total attendees only if there are events and selectDate is defined
        if (events.length > 0 && selectDate) {
            // Find the event for the selected date
            const selectedEvent = events.find(event => isSameDay(event.event_date, selectDate));
    
            // Check if the selected event exists
            if (selectedEvent) {
                // Call fetchTotalAttendees with the event ID
                fetchTotalAttendees(selectedEvent.event_id);
            } else {
                // If no event exists for the selected date, set totalAttendees to 0
                setTotalAttendees(0);
            }
        }
    }, [events, selectDate]); 

     useEffect(() => {
        const fetchUserTicket = async (eventId) => {
            if (auth.user_id) {
                try {
                    const response = await fetch(`http://localhost:7000/tickets/user/${auth.user_id}/event/${eventId}`);
                    const ticketData = await response.json();
                    setUserTicket(ticketData.ticket[0]); // Update userTicket state with the fetched ticket data
                    setTicketFetched(true); // Update ticketFetched state to true once data is fetched
                } catch (error) {
                    console.log(error);
                    setUserTicket({ ticket: [] }); // Reset userTicket state in case of an error
                    setTicketFetched(true); // Update ticketFetched state to true even if there's an error
                }
            }
        };
    
        // This part ensures we have the current selected event's ID based on the selected date
        if (events.length > 0 && selectDate) {
            const selectedEvent = events.find(event => isSameDay(event.event_date, selectDate));
            if (selectedEvent) {
                fetchUserTicket(selectedEvent.event_id);
            }
        }
    }, [selectDate, auth.user_id, events]);

    
    const isSameDay = (eventDate, selectedDate) => {
        const addYearToDate = eventDate.concat(" ", "2024"); 
        const dFormat = dayjs(addYearToDate)
        return dFormat.isSame(selectedDate, 'day');
    };

    // Check if data is loading or if there's an error
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    // Navigate to event page on click
    const handleClick = (eventId) => {
        navigate(`/gp/${eventId}`);
    };

    const handleShowTicket = (ticket) => {
        setUserTicket(ticket);
        setOpen(true);
    };

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
                        .map((event) => (
                            <li key={event.event_id}>
                                
                                <h2>{event.event_name}</h2> 
                                <h3>Circuit: {event.circuit_name}</h3>

                                {!event.completed ? (
                                    <>
                                        <h3>Time: {event.event_time}</h3>
                                
                                        {event.total_capacity === 0 ? (
                                            <h3>Remaining Tickets: Sold Out</h3>
                                        ) : (
                                            <h3>Remaining Tickets: {event.total_capacity}</h3>
                                        )}

                                        {/* {ticketFetched && (
                                            <>  
                                                {userTicket  ? ( 
                                                    <button className='showTicketButton' onClick={() => handleShowTicket(userTicket)}>Show Ticket</button>  
                                                ) : (
                                                    <button className='visitButton' onClick={() => handleClick(event.event_id)}>Visit Event Page</button>
                                                )}
                                            </>
                                        )} */}
                                        {ticketFetched ? (
                                            <div> 
                                                {userTicket ? ( 
                                                    <button className='showTicketButton' onClick={() => handleShowTicket(userTicket)}>Show Ticket</button>  
                                                ) : (
                                                    <button className='visitButton' onClick={() => handleClick(event.event_id)}>Visit Event Page</button>
                                                )}
                                            </div>
                                        ) : (
                                            <div>
                                                <button className='visitButton' onClick={() => handleClick(event.event_id)}>Visit Event Page</button>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <h3>Total attendees: {totalAttendees}</h3>
                                )}
                            </li>
                    ))}
                </ol>
            </div>
            {open && <Ticket userTicket={userTicket} setSelected={setOpen}/>}
        </div>
    )
}

export default Calendar