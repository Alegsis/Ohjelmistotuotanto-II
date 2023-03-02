const express = require('express');
const router = express.Router();
const pool = require('../helpers/database');

/**
 * Returns users SubCategoryName and Balance
 */
router.get('/:id', async (req, res) => {
  try {
    const sqlQuery = `SELECT SubCategoryName, Balance FROM subcategory WHERE UserID=?`;
    const rows = await pool.query(sqlQuery, req.params.id);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

/**
 * get specific subcategory name
 */
router.get('/:id/subcategory-name', async (req, res) => {
  try {
    const sqlQuery = `SELECT SubCategoryName FROM subcategory WHERE UserID=?`;
    const rows = await pool.query(sqlQuery, req.params.id);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

/**
 * Get available to budget balance
 */
router.get('/:id/available-to-budget', async (req, res) => {
  try {
    const sqlQuery = `SELECT subcategory.Balance FROM subcategory WHERE UserID=? AND subcategory.SubCategoryName = 'AvailableFunds'`;
    const rows = await pool.query(sqlQuery, req.params.id);
    res.status(200).json(parseFloat(rows[0].Balance));
  } catch (error) {
    res.status(400).send(error.message);
  }
});

/**
 * Add new subcategory
 */
router.post('/new-subcategory', async (req, res) => {
  try {
    const {SubCategoryName, Balance, UserID, CategoryID} = req.body;
    const sqlQuery = `INSERT INTO subcategory (SubCategoryName, Balance, UserID, CategoryID) VALUES (?, ?, ?, ?)`;

    const rows = await pool.query(sqlQuery,
        [SubCategoryName, Balance, UserID, CategoryID]);
    res.status(200).json({SubCategoryID: rows.insertId.toString()});

  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;