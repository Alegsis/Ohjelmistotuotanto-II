const express = require('express');
const dotenv = require('dotenv');

dotenv.config({path: '.env'});

const PORT = process.env.PORT;

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

const userRouter = require('./routes/user');
app.use('/user', userRouter);

const transactionRouter = require('./routes/transaction');
app.use('/transaction', transactionRouter)


//Start listening
app.listen(PORT, () => {
    console.log(`Listening port ${PORT}`)
})