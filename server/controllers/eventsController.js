const Event = require('../models/eventsModel')

exports.createNewEvent = async (req, res, next) =>{
    try {
        let { event_name } = req.body;

        const event = new Event(event_name);

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
        let updatedEventName = req.body.event_name; 
        const [updatedEvent, _] = await Event.updateById(eventId, updatedEventName)

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

