const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const employeeSchema = new Schema({
    emp_code: {type: String, required: true , unique: true},
    name: {type: String, required: true},
    addedDate: {type: Date, required: true, default: new Date()}
});


module.exports = mongoose.model('employee', employeeSchema, 'employee');
