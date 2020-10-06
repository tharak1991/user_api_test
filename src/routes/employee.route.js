const express = require('express');
const routes = express.Router();

const employee_controller = require('../controllers/employee.controller');



routes.post('/add', async (req, res, next) => {
    try {
        const emp_req = req.body ;
        let employee = await employee_controller.save(emp_req);
        // await email_controller.sendOTP(user._id);
        await res.status(201).json({
            status: true,
            employee: employee
        });
    } catch (e) {
        console.error(e);
        await res.status(500).json({
            status: false,
            error: e
        });
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