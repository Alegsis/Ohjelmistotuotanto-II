const express = require('express');
const router = express.Router();
const pool = require('../helpers/database');

/**
 * Returns users SubCategoryName and Balance
 */
router.get('/:id', async (req, res) => {
  try {
    const sqlQuery = `SELECT SubCategoryName, Balance FROM subcategory WHERE UserID=? AND subcategory.IsActive = 1`;
    const rows = await pool.query(sqlQuery, req.params.id);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

/**
 * Get users subcategories
 */
router.get('/:id/subcategory-name', async (req, res) => {
  try {
    const sqlQuery = `SELECT subcategory.SubCategoryName FROM subcategory WHERE subcategory.UserID=? AND subcategory.IsActive = 1`;
    const rows = await pool.query(sqlQuery, req.params.id);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

/**
 * Get users subcategories name and balance
 */
router.get('/:id/subcategory-name-and-balance', async (req, res) => {
  try {
    const sqlQuery = `SELECT subcategory.SubCategoryName, subcategory.Balance FROM subcategory WHERE UserID=? AND subcategory.IsActive = 1`;
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
 * Get certain subcategory's name, balance and category
 */
router.get('/user-:UserID/get-subcategory-details/subCategoryName-:SubCategoryName', async (req, res) => {
  try {
    const UserID = req.params.UserID;
    const SubCategoryName = req.params.SubCategoryName;

    console.log(UserID)
    console.log(SubCategoryName)


    const sqlQuery = `SELECT subcategory.Balance, category.CategoryName
 FROM subcategory
 INNER JOIN category ON subcategory.CategoryID = category.CategoryID
 WHERE subcategory.SubCategoryName = '${SubCategoryName}' AND subcategory.UserID = ${UserID}`;

    const rows = await pool.query(sqlQuery);
    res.status(200).json(rows);
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

/**
 * Deactivate subcategory
 */
router.post('/deactivate-subcategory', async (req, res) => {
  try {
    const {UserID, SubCategoryName} = req.body;
    const sqlQuery = `UPDATE subcategory SET subcategory.IsActive = 0 WHERE subcategory.UserID = ${UserID} AND subcategory.SubCategoryName = '${SubCategoryName}'`;
    await pool.query(sqlQuery);

    res.status(200).send(`Subcategory ${SubCategoryName} is deactivated`);

  } catch (error) {
    res.status(400).send(error.message);
  }
});

/**
 * Update subcategory's category and/or subcategory name
 */
router.post('/update-subcategory', async (req, res) => {
  try {
    const {NewSubCategoryName, NewCategory, UserID, SubCategoryName} = req.body;
    const sqlQuery = `UPDATE subcategory SET subcategory.SubCategoryName = '${NewSubCategoryName}',
 subcategory.CategoryID = (SELECT category.CategoryID FROM category WHERE category.CategoryName = '${NewCategory}' AND category.userID = ${UserID})
 WHERE subcategory.UserID = ${UserID} AND subcategory.SubCategoryName = '${SubCategoryName}'`;
    await pool.query(sqlQuery);

    res.status(200).send(`Subcategory is now ${NewSubCategoryName} and it's category is ${NewCategory}`);

  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;