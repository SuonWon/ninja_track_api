const express = require('express');
const bodyParser = require('body-parser');
const { getAllData, getData, createData, updateData, deleteData } = require('../controllers/category.controller');

const router = express.Router();

router.get('/', getAllData);

router.get('/:id', getData);

router.post('/add', bodyParser.json(), createData);

router.put('/edit/:id', bodyParser.json(), updateData);

router.delete('/delete/:id', deleteData);

module.exports = router;