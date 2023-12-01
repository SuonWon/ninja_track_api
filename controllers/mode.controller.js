const Mode = require('../models/mode');
const mongoose = require('mongoose');
const Transaction = require('../models/transaction');

const getAllData = async (req, res) => {
    const {user} = req.query;

    try {
        const modes = await Mode.find({user: user}).sort({createdAt: -1});
        res.status(200).json(modes);
    } 
    catch(err) {
        res.status(400).json({error: err.message});
    }
}

const getData = async (req, res) => {
    const {id} = req.params;

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: "This payment mode is not found!"});
        }

        const mode = await Mode.findById(id);
        if(!mode) {
            return res.status(404).json({error: "This payment mode is not found!"});
        }
        res.status(200).json(mode);
    }
    catch(err) {
        res.status(400).json({error: err.message});
    }
    
}

const createData = async (req, res) => {

    const {mode, user} = req.body;
    console.log(user);
    try {
        const newMode = Mode({
            mode: mode,
            user: user
        })
        await newMode.save();

        res.status(200).json({message: "New payment mode is created sccessfully!"});
    }
    catch(err) {
        res.status(400).json({error: err.message});
    }
}

const updateData = async (req, res) => {
    const { id } = req.params;

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: "This payment mode is not found!"});
        }

        const mode = await Mode.findOneAndUpdate({_id: id}, {
            ...req.body
        });

        if(!mode) {
            return res.status(404).json({error: "This payment mode is not found!"});
        }
        res.status(200).json({message: "This payment mode is updated successfully!"});
    }
    catch(err) {
        res.status(400).json({error: err.message});
    }
    
}

const deleteData = async (req, res) => {
    const { id } = req.params;

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: "This payment mode is not found!"});
        }

        const isUsed = await Transaction.find({paymentMode: id});
        if(isUsed.length > 0) {
            return res.status(409).json({error: "This payment mode is used in transaction!. You cannot deleted"});
        }

        const mode = await Mode.findOneAndDelete({_id: id}, {
            ...req.body
        });

        if(!mode) {
            return res.status(404).json({error: "This payment mode is not found!"});
        }
        
        res.status(200).json({message: "This payment mode is deleted!"});
    }
    catch(err) {
        res.status(400).json({error: err.message});
    }
}

module.exports = {getAllData, getData, createData, updateData, deleteData}