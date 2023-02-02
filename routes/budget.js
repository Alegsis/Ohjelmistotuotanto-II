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

/**
 * Add new budget
 */
router.post('/new-budget', async (req, res) => {
    try{
        const {Amount, BudgetDate, FromCategory, ToCategory, UserID} = req.body;
        const sqlQuery = `INSERT INTO budget (Amount, BudgetDate, FromCategory, ToCategory, UserID) VALUES (?, ?, ?, ?, ?)`;

        const rows = await pool.query(sqlQuery, [Amount, BudgetDate, FromCategory, ToCategory, UserID]);
        res.status(200).json({BudgetID: rows.insertId.toString()});

    }catch (error){
        res.status(400).send(error.message)
    }
})

/**
 * Päivitetään budjettia
 */
/*
router.put('/update-budget', async (req, res) => {
    try{
        const {Amount, BudgetDate, FromCategory, ToCategory, UserID} = req.body;
        const sqlQuery = `UPDATE budget (Amount, BudgetDate, FromCategory, ToCategory, UserID) VALUES (?, ?, ?, ?, ?)`;

        const rows = await pool.query(sqlQuery, [Amount, BudgetDate, FromCategory, ToCategory, UserID]);
        res.status(200).json({BudgetID: rows.insertId.toString()});

    }catch (error){
        res.status(400).send(error.message)
    }
})

 */


module.exports = router;