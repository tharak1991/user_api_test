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


routes.post('/upload', upload.single('image'), (req, res) => {
    try {
        res.send(req.file);
    } catch (err) {
        res.send(400);
    }
});



routes.get('/download', function(req, res){
    try {
    var file = '/home/tarak/Tarak/Projects/assignments/ent-bot/ent_bot_test/images' + '/test1.jpg';
    res.download(file);
}catch (err) {
    res.send(400);
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