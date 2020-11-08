// const config = require('../config/index');
const express = require('express');
const routes = express.Router();
// const jwt = require('jsonwebtoken');

const user_controller = require('../controllers/user.controller');
const {
    userType
} = require("../utils/enum");


routes.post('/', async (req, res, next) => {
    try {

        let finalData = user_controller.getFinalData(req.body, userType.EMAIL);
        let user = await user_controller.save(finalData);

        // const token = jwt.sign({ id: user._id }, config.secret, { expiresIn: 86400 });
        
        await res.status(201).json({
            status: true,
            user_id: user._id
        });
    } catch (e) {
        console.error(e);
        await res.status(500).json({
            status: false,
            error: e
        });
    }
});



routes.get("/all", async (req, res, next) => {
    try {
        let users = await user_controller.getAllUsers();
        if (users.length > 0) {
            await res.status(200).json({
                status: true,
                users: users
            });
        } else {
            await res.status(200).json({
                status: false,
                users: users,
                msg: 'No users'
            });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({
            status: false,
            error: e
        });
        next();
    }
});


routes.get("/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        let user = await user_controller.getById(id);
        if (user) {
            await res.status(200).json({
                status: true,
                user: user
            });
        } else {
            await res.status(200).json({
                status: false,
                user: user,
                msg: 'User not found'
            });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({
            status: false,
            error: e
        });
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