const express = require('express');
const routes = express.Router();
const multer = require('multer');
const upload = multer({
    dest: 'uploads/'
});
const fs = require('fs');

const employee_controller = require('../controllers/employee.controller');


const path = require('path');


routes.post('/add', async (req, res, next) => {
    try {
        const emp_req = req.body;
        let employee = await employee_controller.save(emp_req);
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


/***
 * Promise Imeplementation
 */

routes.get("/all", (req, res) => {

    employee_controller.getAllEmployees().then((employees) => {
        if (employees.length > 0) {
            res.status(200).json({
                status: true,
                employees: employees
            });
        } else {
            res.status(200).json({
                status: false,
                employees: employees,
                msg: 'No users'
            });
        }
    }).catch((error) => {
        console.error(e);
        res.status(500).json({
            status: false,
            error: e
        });
    });
});






routes.post('/upload', upload.single('image'), (req, res) => {
    try {
        res.send(req.file);
    } catch (err) {
        res.send(400);
    }
});


routes.post('/upload/:empid', upload.single('image'), async (req, res) => {
    try {
        const empid = req.params.empid;
        console.log(req.file.path);
        if (req.file.path) {
            let updateEmployee = await employee_controller.updateEmployee(empid, req.file.path);
            if (updateEmployee) {
                await res.status(200).json({
                    status: true,
                    employee: updateEmployee
                });
            } else {
                await res.status(200).json({
                    status: false,
                    employee: updateEmployee,
                    msg: 'Employee not found'
                });
            }

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



routes.get('/download', function (req, res) {
    try {
        var file = '/home/tarak/Tarak/Projects/assignments/ent-bot/ent_bot_test/images' + '/test1.jpg';
        res.download(file);
    } catch (err) {
        res.send(400);
    }
});





routes.get("/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        let employee = await employee_controller.getById(id);
        if (employee) {
            await res.status(200).json({
                status: true,
                employee: employee
            });
        } else {
            await res.status(200).json({
                status: false,
                employee: employee,
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