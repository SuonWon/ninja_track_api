// const express = require('express');
// const morgan = require('morgan');
// const dotenv = require('dotenv');
// const mongoose = require('mongoose');

// const app = express();

// const dbURI = `mongodb+srv://${process.env.DB_ACCESS_NAME}:${process.env.DB_PASSWORD}@${process.env.CLUSTER_NAME}.txjxycc.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;

// mongoose.set('strictQuery', true);

// mongoose.connect(dbURI, {seNewUrlParser: true, useUnifiedTopology: true}).then(rec => app.listen(3002)).catch(err => {throw new Error(err)});

// app.use(morgan('dev'));
// app.use