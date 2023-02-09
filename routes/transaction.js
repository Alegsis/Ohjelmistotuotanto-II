const express = require('express')
const router = express.Router();
const pool = require('../helpers/database');

/**
 * Get users all transactions
 */
router.get('/:id', async (req,res) =>{
    try{
        const sqlQuery = `SELECT transaction.TransactionName, transaction.Outflow,transaction.Inflow, transaction.Recipient, 
transaction.TransactionRepeat, transaction.Memo, transaction.TransactionDate 
FROM transaction 
INNER JOIN account ON transaction.AccountID = account.AccountID 
INNER JOIN user ON account.UserID = user.UserID 
WHERE user.UserID=?`;

        const rows = await pool.query(sqlQuery, req.params.id);
        res.status(200).json(rows);
    }catch (error){
        res.status(400).send(error.message)
    }
})

/**
 * Add new transaction
 */
router.post('/new-transaction', async (req, res) => {
    try{
        const {TransactionName, Outflow, Inflow, Recipient, TransactionRepeat, Memo, TransactionDate, AccountID, SubCategoryID} = req.body;
        const sqlQuery = `INSERT INTO transaction 
(transaction.TransactionName, transaction.Outflow,transaction.Inflow, transaction.Recipient, 
transaction.TransactionRepeat, transaction.Memo, transaction.TransactionDate, 
transaction.AccountID, transaction.SubCategoryID ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const rows = await pool.query(sqlQuery,
            [TransactionName, Outflow, Inflow, Recipient,
                TransactionRepeat, Memo, TransactionDate, AccountID, SubCategoryID ]);

        if(res.status(200)){

            //Updates Balances on subcategory and account (OUTFLOW)
            if(req.body.Outflow !== null) {
                const updateSubCategoryBalance = `UPDATE subcategory 
SET SubCategory.Balance = (SELECT SubCategory.Balance FROM subcategory WHERE subcategory.SubCategoryID = ${req.body.SubCategoryID}) - ${req.body.Outflow} 
WHERE subcategory.SubCategoryID = ${req.body.SubCategoryID};`;
                await pool.query(updateSubCategoryBalance);

                const updateAccountBalance = `UPDATE account 
SET account.Balance = (SELECT account.Balance FROM account WHERE account.AccountID = ${req.body.AccountID}) - ${req.body.Outflow} 
WHERE account.AccountID = ${req.body.AccountID};`;
                await pool.query(updateAccountBalance);
            }

            //Updates balance on account (INFLOW)
            else {
                const updateAccountBalance = `UPDATE account 
SET account.Balance = (SELECT account.Balance FROM account WHERE account.AccountID = ${req.body.AccountID}) + ${req.body.Inflow} 
WHERE account.AccountID = ${req.body.AccountID};`;
                await pool.query(updateAccountBalance);
            }

            res.status(200).json({TransactionID: rows.insertId.toString()});
        }
    } catch (error){
        res.status(400).send(error.message)
    }
})

module.exports = router;