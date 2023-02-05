const express = require('express')
const router = express.Router();
const pool = require('../helpers/database');
const bcrypt = require('bcrypt');
const saltRounds = 10;


/**
 * Router to check user data
 */
router.get('/:id', async (req,res) => {
    try{
        const sqlQuery = `SELECT UserID, Username, Email FROM user WHERE userID=?`;
        const rows = await pool.query(sqlQuery, req.params.id);
        res.status(200).json(rows);
    }catch (error){
        res.status(400).send(error.message)
    }
})

/**
 * Router to register new user
 */
router.post('/register', async (req, res) => {
    try{
        const {username, email, password} = req.body;
        const encryptedPassword = await bcrypt.hash(password, saltRounds)

        const sqlQuery = 'INSERT INTO user (Username, Email, UserPassword) VALUES (?, ?, ?)';
        const result = await pool.query(sqlQuery, [username, email, encryptedPassword]);

        res.status(200).json({userID: result.insertId.toString()})
    } catch (error){
        res.status(400).send(error.message)
    }
})

/**
 * Router to login in to your account
 */
router.post('/login', async (req,res) => {
    try {
        const {username, password} = req.body;

        const sqlGetUser = 'SELECT UserPassword FROM user WHERE Username=?';
        const rows = await pool.query(sqlGetUser, username);

        const isValid = await bcrypt.compare(password, rows[0].UserPassword)

        if(isValid){
            res.status(200).json({valid_password: isValid});
        } else if (!isValid){
            res.status(200).send('Wrong password');
        }

    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router;