const express = require('express');
const routes = express.Router();

const user_controller = require('../controllers/user.controller');

routes.post('/register', async (req, res) => {
    try {
        user_controller.checkPassword(req.body.password);
        let finalData = user_controller.getFinalData(req.body);
        await user_controller.save(finalData);
        res.json({status: true, token: {}});
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
