const express = require('express');
const router = express.Router();
const pool = require('../helpers/database');

//Changes date format
const moment = require('moment');

/**
 * Get users all budgets
 */
router.get('/:id', async (req, res) => {
  try {
    const sqlQuery = `SELECT budget.Amount, budget.ToCategory, budget.FromCategory, budget.BudgetDate FROM budget 
INNER JOIN mergebsc ON budget.BudgetID = mergebsc.BudgetID 
INNER JOIN subcategory ON mergebsc.FromSubCategoryID = subcategory.SubCategoryID 
WHERE subcategory.UserID=?`;

    const rows = await pool.query(sqlQuery, req.params.id);

    //For changing date-format to YYYY-MM-DD
    for (let i = 0; i < rows.length; i++) {
      rows[i].BudgetDate = moment(rows[i].BudgetDate).format('YYYY-MM-DD');
    }

    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

/**
 * Add new budget
 */
router.post('/new-budget', async (req, res) => {
  try {

    const {
      Amount,
      BudgetDate,
      FromCategory,
      ToCategory,
      FromSubCategoryID,
      ToSubCategoryID,
    } = req.body;
    const sqlQuery = `INSERT INTO budget (Amount, BudgetDate, FromCategory, ToCategory) VALUES (?, ?, ?, ?)`;

    const rows = await pool.query(sqlQuery,
        [Amount, BudgetDate, FromCategory, ToCategory]);

    if (res.status(200)) {
      const budgetID = rows.insertId.toString();

      const sqlQuery2 = `INSERT INTO mergebsc(mergebsc.BudgetID, mergebsc.FromSubCategoryID, mergebsc.ToSubCategoryID) VALUES (${budgetID},?,?);`;
      await pool.query(sqlQuery2, [FromSubCategoryID, ToSubCategoryID]);

      if (res.status(200)) {

        const updateFromBalance = `UPDATE subcategory 
SET SubCategory.Balance = (SELECT SubCategory.Balance FROM subcategory WHERE subcategory.SubCategoryID = ${req.body.FromSubCategoryID}) - ${req.body.Amount} 
WHERE subcategory.SubCategoryID = ${req.body.FromSubCategoryID};`;
        await pool.query(updateFromBalance);

        const updateToBalance = `UPDATE subcategory 
SET SubCategory.Balance = (SELECT SubCategory.Balance FROM subcategory WHERE subcategory.SubCategoryID = ${req.body.ToSubCategoryID}) + ${req.body.Amount} 
WHERE subcategory.SubCategoryID = ${req.body.ToSubCategoryID};`;
        await pool.query(updateToBalance);

        res.status(200).send(200);
      }
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;