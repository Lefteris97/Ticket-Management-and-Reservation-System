const Stand = require('../models/standsModel')

exports.createNewStand = async (req, res, next) =>{
    try {
        let { event_id, stand_name, capacity } = req.body;

        const stand = new Stand(event_id, stand_name, capacity);

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
        let { event_id, stand_name, capacity } = req.body; 
        const [updatedStand, _] = await Stand.updateById(standId, event_id, stand_name, capacity)

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

