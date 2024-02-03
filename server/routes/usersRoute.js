const router = require('express').Router()
const db = require('../database')

router.get('/', (req, res, next) =>{
    db.query('SELECT * FROM users', (err, results, fields) =>{
        !err ? res.json(results) : res.json({err});
    });
});

module.exports = router