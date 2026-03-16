const Event = require('../models/eventsModel')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'Images')
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

exports.upload = multer({
    storage: storage,
    limits: { fieldSize: '5000000' },
    fileFilter: (req, file, cb) =>{
        const fileTypes = /jpeg|jpg|png|svg/
        const mimeType = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname(file.originalname))

        if (mimeType && extname){
            return cb(null, true)
        }
        cb('Not supported file format')
    }
}).fields([{name: 'flag_icon', maxCount: 1}, {name: 'photo', maxCount: 1}, {name: 'circuit_map', maxCount: 1}])

exports.createNewEvent = async (req, res, next) =>{
    try {
        let event_fields = req.body;
        let flag_icon = req.files['flag_icon'][0].path;
        let photo = req.files['photo'][0].path;
        let circuit_map = req.files['circuit_map'][0].path;

        const event = new Event(event_fields, flag_icon, photo, circuit_map);

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

        // Check if files exist in the request
        let flag_icon = req.files['flag_icon'] ? req.files['flag_icon'][0].path : event_fields.flag_icon;
        let photo = req.files['photo'] ? req.files['photo'][0].path : event_fields.photo;
        let circuit_map = req.files['circuit_map'] ? req.files['circuit_map'][0].path : event_fields.circuit_map;

        const [updatedEvent, _] = await Event.updateById(eventId, event_fields, flag_icon, photo, circuit_map);

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

