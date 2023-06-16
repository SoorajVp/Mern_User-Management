const express = require('express');
const cors = require('cors');
const connectDB = require("./config/connection");
const mongoose = require('mongoose');
const morgan = require('morgan');
require('dotenv').config()

const userRouter = require('./routes/userRouter');
const adminRouter = require('./routes/adminRouter');
const port = process.env.SERVER_PORT;

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"));
app.use(cors());

app.use('/', userRouter);
app.use('/admin', adminRouter);




mongoose.connection.once('open', () => {
  app.listen(port, () => {
    console.log(`Server listening on ${port}`);
  });
});
