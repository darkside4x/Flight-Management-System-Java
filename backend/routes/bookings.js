const express = require('express');
const router = express.Router();
const db = require('../db');

// Book a flight
router.post('/book', (req, res) => {
    const { user, flightId, passengers } = req.body;

    const query = `INSERT INTO bookings (user, flight_id, passengers) VALUES (?, ?, ?)`;
    db.query(query, [user, flightId, passengers], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ message: 'Booking successful', bookingId: results.insertId });
        }
    });
});

// View bookings
router.get('/:user', (req, res) => {
    const user = req.params.user;

    const query = `SELECT * FROM bookings WHERE user = ?`;
    db.query(query, [user], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json(results);
        }
    });
});

module.exports = router;
