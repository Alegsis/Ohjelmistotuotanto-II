const express = require('express')
const router = express.Router();
const pool = require('../helpers/database');

router.get('/:id', async (req,res) =>{
    try{
        const sqlQuery = `SELECT UserID, Username, Email FROM user WHERE userID=?`;
        const rows = await pool.query(sqlQuery, req.params.id);
        res.status(200).json(rows);
    }catch (error){
        res.status(400).send(error.message)
    }
})

router.post('/register', async (req, res) => {
    try{
        const {username, email, password} = req.body;

        const sqlQuery = 'INSERT INTO user (Username, Email, UserPassword) VALUES (?, ?, ?)';
        const result = await pool.query(sqlQuery, [username, email, password]);

        res.status(200).json(result)
    } catch (error){
        res.status(400).send(error.message)
    }
})

module.exports = router;