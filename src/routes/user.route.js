const express = require('express');
const routes = express.Router();

const user_controller = require('../controllers/user.controller');

routes.get('/', (req, res) => {
    try {
        res.json({status: true});
    } catch (e) {
        console.error(e);
        res.status(400).json({
            error: true,
            message: 'ERROR WHILE FETCHING DATA!',
            original: e,
        });
    }
});

module.exports = routes;
