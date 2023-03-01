const express = require('express');
const router = express.Router();
const pool = require('../helpers/database');

/**
 * Find users all categories
 */
router.get('/:id', async (req, res) => {
  try {
    const sqlQuery = `SELECT CategoryName FROM category WHERE UserID=?`;
    const rows = await pool.query(sqlQuery, req.params.id);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
});



/**
 * Find users all categories and them subcategories
 */
router.get('/:id', async (req, res) => {
  try {


    const sqlQuery = `SELECT CategoryName FROM category WHERE UserID=?`;
    const rows = await pool.query(sqlQuery, req.params.id);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
});







/**
 * Add new category
 */
router.post('/new-category', async (req, res) => {
  try {
    const {CategoryName, UserID} = req.body;
    const sqlQuery = `INSERT INTO category (CategoryName, UserID) VALUES (?, ?)`;

    const rows = await pool.query(sqlQuery, [CategoryName, UserID]);
    res.status(200).json({CategoryID: rows.insertId.toString()});

  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;