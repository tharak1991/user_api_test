const {employee_model} = require("../database/models");

exports.save = data => new employee_model(data).save();


exports.updateEmployee = async (id, filepath) => {
    return await employee_model.findByIdAndUpdate(id, {$set: {file_location: filepath}});    
};