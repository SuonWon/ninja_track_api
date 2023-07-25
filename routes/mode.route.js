const express = require('express');


const router = express.Router();

router.get('/', (req, res) => {});

router.get('/:id', (req, res) => {});

router.post('/add', (req, res) => {});

router.put('/edit/:id', (req, res) => {});

router.delete('/delete/:id', (req, res) => {});


module.exports = router;