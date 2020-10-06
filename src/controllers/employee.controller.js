const {employee_model} = require("../database/models");

exports.save = data => new employee_model(data).save();