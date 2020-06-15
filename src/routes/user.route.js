const express = require('express');
const routes = express.Router();

const user_controller = require('../controllers/user.controller');
const email_controller = require("../controllers/email.controller");
const token_controller = require('../controllers/token.controller');
const {userType} = require("../utils/enum");

routes.post('/register', async (req, res, next) => {
    try {
        user_controller.checkPassword(req.body.password);
        let finalData = user_controller.getFinalData(req.body, userType.EMAIL);
        let user = await user_controller.save(finalData);
        await email_controller.sendOTP(user._id);
        await res.json({status: true});
    } catch (e) {
        console.error(e);
        next();
    }
});

routes.post('/register/google', async (req, res, next) => {
    try {
        let finalData = user_controller.getFinalData(req.body, userType.GOOGLE);
        let user = await user_controller.save(finalData);
        let token = token_controller.sign(user._id);
        await res.json({status: true, token, user});
    } catch (e) {
        console.error(e);
        next();
    }
});
routes.post('/register/facebook', async (req, res, next) => {
    try {
        let finalData = user_controller.getFinalData(req.body, userType.FACEBOOK);
        await user_controller.save(finalData);
        await res.json({status: true});
    } catch (e) {
        console.error(e);
        next();
    }
});
routes.post('/register/instagram', async (req, res, next) => {
    try {
        let finalData = user_controller.getFinalData(req.body, userType.INSTAGRAM);
        await user_controller.save(finalData);
        await res.json({status: true});
    } catch (e) {
        console.error(e);
        next();
    }
});

routes.post('/register/applesso', async (req, res, next) => {
    try {
        let finalData = user_controller.getFinalData(req.body, userType.APPLESSO);
        await user_controller.save(finalData);
        await res.json({status: true});
    } catch (e) {
        console.error(e);
        next();
    }
});
routes.post('/register/twitter', async (req, res, next) => {
    try {
        let finalData = user_controller.getFinalData(req.body, userType.TWITTER);
        let user = await user_controller.save(finalData);
        let token = token_controller.sign(user._id);
        await res.json({status: true, token, user});
    } catch (e) {
        console.error(e);
        next();
    }
});

routes.post("/login", async (req, res, next) => {
    try {
        let {email, password} = req.body;
        user_controller.checkPassword(req.body.password);
        let user = await user_controller.login(email, password);
        if (user) {
            delete user.password;
            if (user.verified) {
                let token = token_controller.sign(user._id);
                await res.json({status: true, token, user});
            } else {
                await res.json({status: false, verified: false, userId: user._id, token: {}});
            }
        } else {
            await res.json({status: false, token: {}});
        }
    } catch (e) {
        console.error(e);
        next();
    }
});

routes.post("/otp/validate", async (req, res, next) => {
    try {
        let {otp, user} = req.body;
        let validate = await email_controller.validateOTP(otp, user);
        if (validate) {
            await res.json({status: true});
        } else {
            await res.json({status: false});
        }
    } catch (e) {
        console.error(e);
        next();
    }
});
routes.post("/otp/resend", async (req, res, next) => {
    try {
        let {user} = req.body;
        let resend = await email_controller.sendOTP(user);
        if (resend) {
            await res.json({status: true});
        } else {
            await res.json({status: false});
        }
    } catch (e) {
        console.error(e);
        next();
    }
});

routes.post("/login/social", async (req, res, next) => {
    try {
        let user = await user_controller.loginSocial(req.body);
        console.log(req.body, user);
        if (user) {
            let token = token_controller.sign(user._id);
            await res.json({status: true, token, user});
        } else {
            await res.json({status: false, token: {}});
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
            await res.json({status: true});
        } else {
            await res.json({status: false});
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
