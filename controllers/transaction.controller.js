const Transaction = require('../models/transaction');
const mongoose = require('mongoose');
const moment = require('moment');

const getAllData = async (req, res) => {
    const { category, duration, remark, user } = req.query;

    let startDate, endDate = '';
    
    switch (duration) {
        case "Today":
            startDate = moment(new Date()).format('YYYY-MM-DD') + 'T00:00:00';
            endDate = moment(new Date()).format('YYYY-MM-DD') + 'T23:59:59';
            break;

        case "Yesterday":
            let yesterday = new Date();
            startDate = moment(yesterday.setDate(yesterday.getDate() - 1)).format('YYYY-MM-DD') + 'T00:00:00';
            endDate = moment(yesterday).format('YYYY-MM-DD') + 'T23:59:59';
            break;
    
        default:
            break;
    }

    console.log("duration: " + duration);
    console.log("startdate: " + startDate);
    console.log("enddate: " + endDate);
    console.log('reamrk: ' + remark);

    try{
        const transaction = await Transaction.find({
            $and: [
                { user: user},
                duration == undefined ? {} : 
                    {
                        datetime: {
                            $gte: startDate,
                            $lte: endDate
                        }
                    },
                category != null ? { category: category} : {},
                remark != null ? { remark: new RegExp('.*' + remark + '.*')} : {}
            ]
        }
            
        ).sort({datetime: -1});

        res.status(200).json(transaction);
    }
    catch(err) {
        res.status(400).json({error: err.message});
    }
}

const getData = async (req, res) => {
    const { id } = req.params;

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: "This transaction data is not found!"});
        }

        const transaction = await Transaction.findById(id);
        if(!transaction) {
            return res.status(404).json({error: "This transaction data is not found!"});
        }
        res.status(200).json(transaction);
    }
    catch(err) {
        res.status(400).join({error: err.message});
    }
}

const createData = async (req, res) => {
    const { datetime, amount, remark, category, paymentMode, cashType, user } = req.body;

    const newTransaction = Transaction({
        datetime: datetime,
        amount: amount,
        remark: remark,
        category: category,
        paymentMode: paymentMode,
        cashType: cashType,
        user: user
    });

    try {
        await newTransaction.save();

        res.status(200).json({message: "New transaction is added sccessfully!"});
    }
    catch(err) {
        res.status(400).json({error: err.message});
    }
}

const updateData = async (req, res) => {
    const { id } = req.params;

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: "This transaction data is not found!"});
        }

        const transaction = await Transaction.findOneAndUpdate({_id: id}, {
            ...req.body
        });

        if(!transaction) {
            return res.status(404).json({error: "This transaction data is not found!"});
        }

        res.status(200).json({ message: "This transaction data is updated successfully!"});
    }
    catch(err) {
        res.status(400).json({error: err.message});
    }
}

const deleteData = async (req, res) => {
    const { id } = req.params;

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: "This transaction data is not found!"});
        }

        const transaction = await Transaction.findOneAndDelete({_id: id});

        if(!transaction) {
            return res.status(404).json({error: "This transaction data is not found!"});
        }

        res.status(200).json({ message: "This transaction data is deleted!"});
    }
    catch(err) {
        res.status(400).json({error: err.message});
    }
}

module.exports = {getAllData, getData, createData, updateData, deleteData}