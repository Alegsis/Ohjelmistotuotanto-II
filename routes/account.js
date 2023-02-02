const express = require('express')
const router = express.Router();
const pool = require('../helpers/database');

/**
 * Returns the total sum of the accounts
 */
router.get('/:id', async (req,res) =>{
    try{
        const sqlQuery = `SELECT SUM(Balance) AS balance_summary FROM account WHERE userID=?`;
        const rows = await pool.query(sqlQuery, req.params.id);
        res.status(200).json(rows[0].balance_summary);

    }catch (error){
        res.status(400).send(error.message)
    }
})


module.exports = router;