
const express = require('express');
const mongoose = require('mongoose');
const categoryRoute = require('./routes/category.route');
const modeRoute = require('./routes/mode.route');
const userRoute = require('./routes/user.route');
const transcationRoute = require('./routes/transaction.route');
const functions = require('firebase-functions');
const cors = require('cors');

require('dotenv').config();

const app = express();

app.use(cors());

app.use((req, res, next) => {
    console.log(req.path + ' '+ req.method);
    next();
})

app.use('/api/category', categoryRoute);
app.use('/api/payment-mode', modeRoute);
app.use('/api', userRoute);
app.use('/api/transaction', transcationRoute);

const dbURI = `mongodb+srv://${process.env.DB_ACCESS_NAME}:${process.env.DB_PASSWORD}@${process.env.CLUSTER_NAME}.txjxycc.mongodb.net/${process.env.DATABASE_NAME}`;

mongoose.set('strictQuery', true);

mongoose.connect(dbURI)
    .then(rec => {
        app.listen(4000, () => {
            console.log('Listening on port: 4000');
        })
    })
    .catch(err => {
        console.log(err);
    });


exports.app = functions.https.onRequest(app);