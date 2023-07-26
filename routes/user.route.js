const express = require('express');
const bodyParser = require('body-parser')
const { getData, createData, login, updateData, changePassword } = require('../controllers/user.controller');

const router = express.Router();


router.post('/login', bodyParser.json(), login)

router.post('/signup', bodyParser.json(), createData);

router.get('/user/:id', getData);

router.put('/user/edit/:id', bodyParser.json(), updateData);

router.put('/user/change-password/:id', bodyParser.json(), changePassword);

module.exports = router;