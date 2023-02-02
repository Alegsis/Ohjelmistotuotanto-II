const express = require('express')
const router = express.Router();
const pool = require('../helpers/database');

router.get('/', async (req,res) =>{
    try{
        const sqlQuery = `SELECT SubCategoryName, Balance FROM subcategory`;
        const rows = await pool.query(sqlQuery);
        res.status(200).json(rows);
    }catch (error){
        res.status(400).send(error.message)
    }
})

router.post('/new-subcategory', async (req, res) => {
    try{
        const {CategoryName, UserID} = req.body;
        const sqlQuery = `INSERT INTO category (CategoryName, UserID) VALUES (?, ?)`;

        const rows = await pool.query(sqlQuery, [CategoryName, UserID]);
        res.status(200).json({CategoryID: rows.insertId.toString()});

    } catch (error){
        res.status(400).send(error.message)
    }
})

module.exports = router;