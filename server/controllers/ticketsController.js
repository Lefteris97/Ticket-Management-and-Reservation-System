const Ticket = require('../models/ticketsModel')
const Event = require('../models/eventsModel');
const Stand = require('../models/standsModel');

const EventsController = require('../controllers/eventsController');
const StandsController = require('../controllers/standsController');

exports.createNewTicket = async (req, res, next) =>{
    try {
        let ticket_fields = req.body;

         // Check if the user has already booked a ticket for the event
         const [existingTickets] = await Ticket.findTicketByEventAndUser(ticket_fields.event_id, ticket_fields.user_id);
         
         if (existingTickets.length > 0) {
             return res.status(400).json({ message: "User has already booked a ticket for this event" });
         }

        // Check if the total capacity of the event is 0 or the stand capacity is 0
        const [event, _] = await Event.findById(ticket_fields.event_id);
        const [stand, otherLines] = await Stand.findById(ticket_fields.stand_id);
        if (event[0].total_capacity === 0 || stand[0].capacity === 0) {
            return res.status(400).json({ message: "No more seats" });
        }

        const ticket = new Ticket(ticket_fields);

        await ticket.save();

        // Update stand and event capacities
        await updateCapacities(ticket_fields.event_id, ticket_fields.stand_id, -1);

        res.status(201).json({
            message:"Created new ticket"
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getTicketById = async (req, res, next) =>{
    try {
        let ticketId = req.params.id;
        let [ticket, _] = await Ticket.findById(ticketId);

        res.status(200).json({ticket});
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getTotalAttendeesByEventId = async (req, res, next) =>{
    try {
        let eventId = req.params.id;
        let [attendees, _] = await Ticket.getTotalAttendees(eventId);

        const totalAttendees = attendees[0].total_attendees;

        res.status(200).json({totalAttendees}); 
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getUserTicketByEventId = async (req, res, next) =>{
    try {
        let user_id = req.params.user_id;
        let event_id = req.params.event_id;

        const [ticket, _] = await Ticket.getUserTicketForEvent(user_id, event_id)
        
        res.status(200).json({ticket}); 
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getAllTickets = async (req, res, next) =>{
    try {
        const [tickets, _] = await Ticket.findAll();  

        res.status(200).json({count: tickets.length, tickets});
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.updateTicket = async (req, res, next) =>{
    try {
        let ticketId = req.params.id;
        let ticket_fields = req.body; 

        // Get the existing ticket data
        const [existingTicket, otherLines] = await Ticket.findById(ticketId);

        const [updatedTicket, _] = await Ticket.updateById(ticketId, ticket_fields)

        // Update stand and event capacities if the event or stand has been changed
        if (existingTicket[0].event_id !== ticket_fields.event_id || existingTicket[0].stand_id !== ticket_fields.stand_id) {
            // Increment the capacity of the previous stand and event
            await updateCapacities(existingTicket[0].event_id, existingTicket[0].stand_id, 1);
            // Decrement the capacity of the new stand and event
            await updateCapacities(ticket_fields.event_id, ticket_fields.stand_id, -1);
        }

        res.status(200).json({updatedTicket});
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.deleteTicket = async (req, res, next) =>{
    try {
        let ticketId = req.params.id;

        // Get the ticket data
        const [existingTicket, _] = await Ticket.findById(ticketId);

        await Ticket.deleteById(ticketId);

        // Update stand and event capacities
        await updateCapacities(existingTicket[0].event_id, existingTicket[0].stand_id, 1);

        res.status(200).json({"message" : "Ticket has been deleted"});
    } catch (error) {
        console.log(error);
        next(error);
    }
}

// Function to update stand and event capacities
async function updateCapacities(eventId, standId, adjustment) {
    // Decrement the capacity of the stand
    await StandsController.updateCapacity(standId, adjustment);
    // Decrement the total capacity of the event
    await EventsController.updateTotalCapacity(eventId, adjustment);
}