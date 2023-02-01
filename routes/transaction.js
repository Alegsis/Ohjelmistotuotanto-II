const express = require('express')
const router = express.Router();
const pool = require('../helpers/database');

router.get('/', async (req,res) =>{
    try{
        const sqlQuery = `SELECT TransactionName, TransactionRepeat, Recipient, transaction.Outflow, transaction.Memo FROM transaction`;
        const rows = await pool.query(sqlQuery);
        res.status(200).json(rows);
    }catch (error){
        res.status(400).send(error.message)
    }
})

module.exports = router;