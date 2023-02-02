const express = require('express')
const router = express.Router();
const pool = require('../helpers/database');

//Changes date format
const moment = require('moment');

router.get('/', async (req,res) =>{
    try{
        let sqlQuery = `SELECT Amount, BudgetDate, FromCategory, ToCategory FROM budget`;
        const rows = await pool.query(sqlQuery);

        //For changing date-format to YYYY-MM-DD
        for (let i = 0; i < rows.length; i++) {
            rows[i].BudgetDate = moment(rows[i].BudgetDate).format("YYYY-MM-DD");
        }

        res.status(200).json(rows);
    }catch (error){
        res.status(400).send(error.message)
    }
})

module.exports = router;