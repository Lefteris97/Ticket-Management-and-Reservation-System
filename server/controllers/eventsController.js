const Event = require('../models/eventsModel')

exports.createNewEvent = async (req, res, next) =>{
    try {
        let event_fields = req.body;

        const event = new Event(event_fields);

        await event.save();

        res.status(201).json({message:"Created new Event"});

    } catch (error) {
        console.log(error);
        next(error);
    }
}


exports.getEventById = async (req, res, next) =>{
    try {
        let eventId = req.params.id;
        let [event, _] = await Event.findById(eventId); // _ because we dont use the second value

        res.status(200).json({event});
    } catch (error) {
        console.log(error);
        next(error); //send it to global error handler
    }
}

exports.getAllEvents = async (req, res, next) =>{
    try {
        const [events, _] = await Event.findAll();  

        res.status(200).json({count: events.length, events});
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.updateEvent = async (req, res, next) =>{
    try {
        let eventId = req.params.id;
        let event_fields = req.body; 
        const [updatedEvent, _] = await Event.updateById(eventId, event_fields)

        res.status(200).json({updatedEvent});
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.deleteEvent = async (req, res, next)=>{
    try {
        let eventId = req.params.id;
        await Event.deleteById(eventId);

        res.status(200).json({"message" : "Event has been deleted"});
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.updateTotalCapacity = async (eventId, adjustment) =>{
    try {
        // Get the current total capacity of the event
        const [event, _] = await Event.findById(eventId);
        // console.log('event: ', event);
        const currentTotalCapacity = event[0].total_capacity;

        // Calculate the new total capacity after adjustment
        const newTotalCapacity = currentTotalCapacity + adjustment;

        await Event.updateTotalCapacityByEventId(eventId, newTotalCapacity);

        console.log('Total capacity updated successfully');
    } catch (error) {
        console.log(error);
    }
}

