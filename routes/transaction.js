const express = require('express')
const router = express.Router();
const pool = require('../helpers/database');

router.get('/:id', async (req,res) =>{
    try{
        const sqlQuery = `SELECT TransactionName, TransactionRepeat, Recipient
FROM transaction 
WHERE transaction.SubCategoryID = (SELECT subcategory.SubCategoryID FROM subcategory WHERE subcategory.SubCategoryName =?)`;
        const rows = await pool.query(sqlQuery, req.params.id);
        res.status(200).json(rows);
    }catch (error){
        res.status(400).send(error.message)
    }
})

module.exports = router;