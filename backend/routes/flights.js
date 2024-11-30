const express = require('express');
const router = express.Router();
const db = require('../db');

// Search flights
router.get('/search', (req, res) => {
    const { origin, destination, date } = req.query;

    const query = `SELECT * FROM flights WHERE origin = ? AND destination = ? AND date = ?`;
    db.query(query, [origin, destination, date], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json(results);
        }
    });
});

module.exports = router;
