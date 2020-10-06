const {employee_model} = require("../database/models");

exports.save = data => new employee_model(data).save();


exports.updateEmployee = async (id, filepath) => {
    return await employee_model.findByIdAndUpdate(id, {$set: {file_location: filepath}});    
};



exports.getAllEmployees = async () => {
    let employees = await employee_model.find();
    return employees;
}


exports.getById = async id => {
    let employee = await employee_model.findById(id);
    return employee;
}

exports.getById = id => {
    let employee =  employee_model.findById(id);
    return employee;
}