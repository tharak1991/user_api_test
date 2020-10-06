const express = require('express');
const routes = express.Router();
const multer  = require('multer');
const upload = multer({dest:'uploads/'});

const employee_controller = require('../controllers/employee.controller');



// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads');
//     },
//     filename: (req, file, cb) => {
//         console.log(file);
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
// });

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
// }

// const upload = multer({ storage: storage, fileFilter: fileFilter });

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


routes.post('/single', upload.single('image'), (req, res) => {
    try {
      res.send(req.file);
    }catch(err) {
      res.send(400);
    }
  });


// routes.post('/upload', upload.single('image'), (req, res, next) => {
//     try {
//         return res.status(201).json({
//             message: 'File uploded successfully'
//         });
//     } catch (error) {
//         console.error(error);
//     }
// });


routes.use('*', (req, res) => {
    res.status(400).json({
        error: true,
        message: 'ERROR WHILE FETCHING DATA!',
        original: {},
    });
});


module.exports = routes;