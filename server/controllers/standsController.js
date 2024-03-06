const Stand = require('../models/standsModel')

exports.createNewStand = async (req, res, next) =>{
    try {
        let { event_id, stand_name, price, capacity } = req.body;

        const stand = new Stand(event_id, stand_name, price, capacity);

        await stand.save();

        res.status(201).json({message:"Created new Stand"});

    } catch (error) {
        console.log(error);
        next(error);
    }
}


exports.getStandById = async (req, res, next) =>{
    try {
        let standId = req.params.id;
        let [stand, _] = await Stand.findById(standId); // _ because we dont use the second value

        res.status(200).json({stand});
    } catch (error) {
        console.log(error);
        next(error); //send it to global error handler
    }
}

exports.getStandsByEventId = async (req, res, next) =>{
    try {
        let eventId = req.params.eventId;
        let [eventStands, _] = await Stand.findByEventId(eventId);

        res.status(200).json({eventStands});
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getAllStands = async (req, res, next) =>{
    try {
        const [stands, _] = await Stand.findAll();  

        res.status(200).json({count: stands.length, stands});
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.updateStand = async (req, res, next) =>{
    try {
        let standId = req.params.id;
        let { event_id, stand_name, price, capacity } = req.body; 
        const [updatedStand, _] = await Stand.updateById(standId, event_id, stand_name, price, capacity)

        res.status(200).json({updatedStand});
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.deleteStand = async (req, res, next)=>{
    try {
        let standId = req.params.id;
        await Stand.deleteById(standId);

        res.status(200).json({"message" : "Stand has been deleted"});
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.updateCapacity = async (standId, adjustment) =>{
    try {
        const [stand, _] = await Stand.findById(standId);

        const currentCapacity = stand[0].capacity;

        const newCapacity = currentCapacity + adjustment;

        await Stand.updateCapacityByStandId(standId, newCapacity);

        console.log(newCapacity)
        console.log('Stand capacity updated successfully');
    } catch (error) {
        console.log(error);
    }
}

