const User = require('../models/user');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

const getData = async (req, res) => {
    const { id } = req.params;

    try{
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: "This user is not found!"});
        }

        const user = await User.findById(id);

        if(!user) {
            return res.status(404).json({error: "This user is not found!"});
        }
        res.status(200).json(user);
    }
    catch(err) {
        res.status(400).json({error: err.message});
    }
    
}

const login = async (req, res) => {
    const {username, password} = req.body;
   
    try{

        const user = await User.findOne({username: username})

        if(!user) {
            return res.status(404).json({error: "Username is wrong!"});
        }
        else if(user.password !== password) {
            return res.status(404).json({error: "Password is wrong!"});
        }
        
        res.status(200).json(user);

    }
    catch(err) {
        res.status(400).json({error: err.message});
    }
}

const createData = async (req, res) => {

    const { username, password, fullName } = req.body;

    const newUser = User({
        username: username,
        password: password,
        fullName: fullName,
        email: null,
        phoneNo: null
    })

    try {

        const exist = await User.find({ username: username});

        if(exist) {
            res.status(409).json({error: "This username is already in used!"})
        }

        let token = jwt.sign({username, password}, process.env.SECRET, { expiresIn: '1m' });

        const user = await newUser.save();

        res.status(200).json({...user, token: token});
    }
    catch(err) {
        res.status(400).json({error: err.message});
    }
}

const updateData = async (req, res) => {
    const { id } = req.params;

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: "This user is not found!"});
        }

        const user = await User.findOneAndUpdate({_id: id}, {
            ...req.body
        });

        if(!user) {
            return res.status(404).json({error: "This user is not found!"});
        }

        res.status(200).json({message: "This user is updated successfully!", data: user});
    }
    catch(err) {
        res.status(400).json({error: err.message});
    }
}

const changePassword = async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: "This user is not found!"});
        }

        const user = await User.findOneAndUpdate({_id: id}, {
            password: password
        });

        if(!user) {
            return res.status(404).json({error: "This user is not found!"});
        }

        res.status(200).json({message: "User password is changed successfully!"});
    }
    catch(err) {
        res.status(400).json({error: err.message});
    }
}


module.exports = {
    createData, getData, login, updateData, changePassword
}