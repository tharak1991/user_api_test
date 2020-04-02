const express = require('express');
const routes = express.Router();

const user_controller = require('../controllers/user.controller');
const token_controller = require('../controllers/token.controller');

routes.post('/register', async (req, res, next) => {
    try {
        user_controller.checkPassword(req.body.password);
        let finalData = user_controller.getFinalData(req.body);
        await user_controller.save(finalData);
        res.json({status: true});
    } catch (e) {
        console.error(e);
        next();
    }
});

routes.post("/login", async (req, res, next) => {
    try {
        let {email, password} = req.body;
        let user = await user_controller.login(email, password);
        if (user) {
            delete user.password;
            let token = token_controller.sign(user._id);
            res.json({status: true, token, user});
        } else {
            res.json({status: false, token: {}});
        }
    } catch (e) {
        console.error(e);
        next();
    }
});

routes.post("/check/token", async (req, res, next) => {
    try {
        let token = token_controller.verify(req.body.token);
        if (token) {
            res.json({status: true});
        } else {
            res.json({status: false});
        }
    } catch (e) {
        console.error(e);
        next();
    }
});

routes.use('*', (req, res) => {
    res.status(400).json({
        error: true,
        message: 'ERROR WHILE FETCHING DATA!',
        original: {},
    });
});


module.exports = routes;
