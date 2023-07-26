const Category = require('../models/category');
const mongoose = require('mongoose');

const getAllData = async (req, res) => {
    try {
        const categories = await Category.find().sort({createdAt: -1});
        res.status(200).json(categories);
    } 
    catch(err) {
        res.status(400).json({error: err.message});
    }
}

const getData = async (req, res) => {
    const {id} = req.params;

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: "This category is not found!"});
        }

        const category = await Category.findById(id);
        if(!category) {
            return res.status(404).json({error: "This category is not found!"});
        }
        res.status(200).json(category);
    }
    catch(err) {
        res.status(400).json({error: err.message});
    }
    
}

const createData = async (req, res) => {
    const {category} = req.body;

    try {
        await Category.create({category})

        res.status(200).json({message: "New category is created sccessfully!"});
    }
    catch(err) {
        res.status(400).json({error: err.message});
    }
}

const updateData = async (req, res) => {
    const { id } = req.params;

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: "This category is not found!"});
        }

        const category = await Category.findOneAndUpdate({_id: id}, {
            ...req.body
        });

        if(!category) {
            return res.status(404).json({error: "This category is not found!"});
        }
        res.status(200).json({message: "This category is updated successfully!"});
    }
    catch(err) {
        res.status(400).json({error: err.message});
    }
    
}

const deleteData = async (req, res) => {
    const { id } = req.params;

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: "This category is not found!"});
        }

        const category = await Category.findOneAndDelete({_id: id}, {
            ...req.body
        });

        if(!category) {
            return res.status(404).json({error: "This category is not found!"});
        }
        
        res.status(200).json({message: "This category is deleted!"});
    }
    catch(err) {
        res.status(400).json({error: err.message});
    }
}

module.exports = {getAllData, getData, createData, updateData, deleteData}