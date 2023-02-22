const express = require('express');
const router = express.Router();
const pool = require('../helpers/database');

//Changes date format
const moment = require('moment');

/**
 * Returns the total sum of the accounts
 */
router.get('/:id/sum-balance', async (req, res) => {
  try {
    const sqlQuery = `SELECT SUM(Balance) AS debt_summary FROM account WHERE userID=? AND AccountType IN ('Credit Card', 'Loan')`;
    const sqlQuery2 = `SELECT SUM(Balance) AS balance_summary FROM account WHERE userID=? AND AccountType IN ('Cash', 'Savings', 'Checking')`;

    const rows = await pool.query(sqlQuery2, req.params.id);
    const rows2 = await pool.query(sqlQuery, req.params.id);

    const value1 = rows[0].balance_summary;
    const value2 = rows2[0].debt_summary;

    const output = {
      balance_summary: value1,
      debt_summary: value2,
    };
    res.status(200).json(output);

  } catch (error) {
    res.status(400).send(error.message);
  }
});

/**
 * Returns users bank accounts
 */
router.get('/:id', async (req, res) => {
  try {
    const sqlQuery = `SELECT AccountName, AccountType, Balance, BalanceDate, IsActive FROM account WHERE userID=?`;
    const rows = await pool.query(sqlQuery, req.params.id);

    //For changing date-format to YYYY-MM-DD
    for (let i = 0; i < rows.length; i++) {
      rows[i].BalanceDate = moment(rows[i].BalanceDate).format('YYYY-MM-DD');
    }
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get('/:id/account-name', async (req, res) => {
  try {
    const sqlQuery = `SELECT AccountName FROM account WHERE userID=?`;
    const rows = await pool.query(sqlQuery, req.params.id);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

/**
 * Add new bank account
 */
router.post('/new-account', async (req, res) => {
  try {
    const {AccountName, AccountType, Balance, BalanceDate, UserID} = req.body;
    const sqlQuery = `INSERT INTO account (AccountName, AccountType, Balance, BalanceDate, UserID) VALUES (?, ?, ?, ?, ?)`;

    const rows = await pool.query(sqlQuery,
        [AccountName, AccountType, Balance, BalanceDate, UserID]);
    res.status(200).json({AccountID: rows.insertId.toString()});

  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;