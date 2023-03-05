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
 * Find specific categoryID
 */
router.get('/user-:userID/find-categoryid/categoryname-:categoryName', async (req, res) => {
  try {
    const sqlQuery = `SELECT category.CategoryID FROM category WHERE category.UserID=? AND category.CategoryName=?`;

    const userID = req.params.userID;
    const categoryName = req.params.categoryName;

    const rows = await pool.query(sqlQuery, [userID, categoryName]);
    res.status(200).json(rows[0].CategoryID);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

/**
 * Find users all categories and them subcategories
 */
router.get('/:id/return-category-dictionary', async (req, res) => {
  try {
    const userID = req.params.id;
    const sqlQueryCategories = `SELECT category.CategoryName FROM category WHERE UserID=? AND category.CategoryName != 'Available' `;
    const categories = await pool.query(sqlQueryCategories, userID);
    let dictionary = [];

    for(let x = 0; x < categories.length; x++){
      let subCategoriesList = [];
      let categoryName = categories[x].CategoryName
      let categoryBalance = 0;

      const sqlQuerySubCategories = `SELECT subcategory.SubCategoryName, subcategory.Balance FROM subcategory
WHERE subcategory.CategoryID = (SELECT category.CategoryID FROM category WHERE category.CategoryName = '${categoryName}' AND category.UserID = ${userID}) AND subcategory.IsActive = 1`;
      const subCategories = await pool.query(sqlQuerySubCategories);

      for(let y = 0; y < subCategories.length; y++){
        let subcategoryBalance = parseFloat(subCategories[y].Balance);
        subCategoriesList.push({
              category: subCategories[y].SubCategoryName,
              balance: parseFloat(subcategoryBalance.toFixed(2))
        });

        categoryBalance += subcategoryBalance;
      }

      dictionary.push({
        category : categoryName,
        balance : parseFloat(categoryBalance.toFixed(2)),
        subcategory : subCategoriesList,
      });
    }

    res.status(200).json(dictionary);
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