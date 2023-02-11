const express = require('express');
const router = express.Router();
const pool = require('../helpers/database');
const bcrypt = require('bcrypt');
const saltRounds = 10;

/**
 * Router to check user data
 */
router.get('/:id', async (req, res) => {
  try {
    const sqlQuery = `SELECT UserID, Username, Email FROM user WHERE userID=?`;
    const rows = await pool.query(sqlQuery, req.params.id);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

/**
 * Router to register new user
 */
router.post('/register', async (req, res) => {
  try {
    const {username, email, password} = req.body;
    const encryptedPassword = await bcrypt.hash(password, saltRounds);

    const sqlQueryFind = `SELECT Username FROM user WHERE Username=?`;
    const resultFind = await pool.query(sqlQueryFind, username);

    if (resultFind.length === 0) {
      const insertUser = 'INSERT INTO user (Username, Email, UserPassword) VALUES (?, ?, ?)';
      const resultInsertUser = await pool.query(insertUser, [username, email, encryptedPassword]);
      const insertedUserID = resultInsertUser.insertId;

      const insertCategory = `INSERT INTO category (CategoryName, UserID) VALUES ("Available", ${insertedUserID})`;
      const resultInsertCategory = await pool.query(insertCategory);
      const insertedCategoryID = resultInsertCategory.insertId.toString();

      const insertSubCategory = `INSERT INTO subcategory (SubCategoryName, Balance, UserID, CategoryID) VALUES ("AvailableFunds", 0, ${insertedUserID}, ${insertedCategoryID})`;
      await pool.query(insertSubCategory);


      res.status(200).json({userID: insertedUserID.toString()});
    } else {
      res.status(409).send('Username is taken');
    }

  } catch (error) {
    res.status(400).send(error.message);
  }
});

/**
 * Router to login in to your account
 */
router.post('/login', async (req, res) => {
  try {
    const {username, password} = req.body;

    const sqlGetUser = 'SELECT userID, UserPassword FROM user WHERE Username=?';
    const rows = await pool.query(sqlGetUser, username);

    const isValid = await bcrypt.compare(password, rows[0].UserPassword);

    if (isValid) {
      const sqlGetUser = `SELECT userID FROM user WHERE Username=?`;
      const userID = await pool.query(sqlGetUser, username);
      res.status(200).json(userID[0].userID);
    } else if (!isValid) {
      res.status(401).send('Wrong password');
    }

  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;