const express = require('express');
const routes = express.Router();

const user_controller = require('../controllers/user.controller');
const token_controller = require('../controllers/token.controller');
const {
    userType
} = require("../utils/enum");


routes.post('/register', async (req, res, next) => {
    try {
        user_controller.checkPassword(req.body.password);
        let finalData = user_controller.getFinalData(req.body, userType.EMAIL);
        let user = await user_controller.save(finalData);
        // await email_controller.sendOTP(user._id);
        await res.status(201).json({
            status: true,
            user: user._id
        });
    } catch (e) {
        console.error(e);
        await res.status(500).json({
            status: false,
            error: e
        });
    }
});


routes.post("/login", async (req, res, next) => {
    try {
        let {
            email,
            password
        } = req.body;
        user_controller.checkPassword(req.body.password);
        let user = await user_controller.login(email, password);
        if (user) {
            delete user.password;

            let token = token_controller.sign(user._id);
            await res.status(200).json({
                status: true,
                token,
                user
            });
        } else {
            await res.json({
                status: false,
                token: {}
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


routes.post("/logout", async (req, res, next) => {
    //Since jwt token is stateless, delete token from client side and remove it from header of requests
    try {
        if (!req.headers.Authorization || !req.headers.Authorization.startsWith('Bearer ')) {
            res.status(200).json({
                status: true,
                is_logged_out: true
            });
            return;
        } else {
            res.status(200).json({
                status: true,
                is_logged_out: false
            });
            return;
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({
            status: false,
            error: e
        });
        return;
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


routes.put("/:id", async (req, res, next) => {
    try {
        const id = req.params.id
        const user = req.body.user;
        let updatedUser = await user_controller.updateUser(id, user);
        if (updatedUser) {
            await res.status(200).json({
                status: true,
                user: updatedUser
            });
        } else {
            await res.status(200).json({
                status: false,
                user: updatedUser,
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


routes.delete("/:id", async (req, res, next) => {
    try {
        const id = req.params.id
        let deletedUser = await user_controller.deleteUser(id);
        if (deletedUser) {
            await res.status(200).json({
                status: true,
                is_deleted: true
            });
        } else {
            await res.status(200).json({
                status: false,
                is_deleted: false,
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



routes.post("/token/verify", async (req, res, next) => {
    try {
        let token = token_controller.verify(req.body.token);
        if (token) {
            await res.status(200).json({
                status: true,
                token_valid: true
            });
        } else {
            await res.status(200).json({
                status: false,
                token_valid: false
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