const express = require('express');
const router = express.Router();
const pool = require('../helpers/database');

/**
 * Find users all goals and them subcategory names
 */
router.get('/:id/get-goal-amounts', async (req, res) => {
  try {
    const sqlQuery = `SELECT goal.Amount, subcategory.SubCategoryName FROM goal 
INNER JOIN subcategory ON goal.SubCategoryID = subcategory.SubCategoryID 
WHERE UserID=?`;
    const rows = await pool.query(sqlQuery, req.params.id);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send('Can not get goal amounts');
  }
});

/**
 * Add new goal
 */
router.post('/new-goal', async (req, res) => {
  try {
    const {SubCategoryName, Amount, Date, Type, UserID} = req.body;

    const sqlQueryFindSubcategory = `SELECT subcategory.SubCategoryID FROM subcategory WHERE subcategory.SubcategoryName=? AND subcategory.UserID=?`;
    const resultFindSubcategoryID = await pool.query(sqlQueryFindSubcategory,
        [SubCategoryName, UserID]);

    const subCategoryID = resultFindSubcategoryID[0].SubCategoryID;

    const sqlQuery = `INSERT INTO goal (goal.Amount, goal.GoalDate, goal.GoalType, goal.SubCategoryID) VALUES (?, ?, ?, ?)`;
    await pool.query(sqlQuery,
        [Amount, Date, Type, subCategoryID]);
    res.status(200).json('New goal was added');

  } catch (error) {
    res.status(400).send('Can not add new goal, please try again');
  }
});

module.exports = router;