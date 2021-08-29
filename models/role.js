const mongoose = require("mongoose");
const roleSchema=mongoose.Schema;

const role =new roleSchema({
    name: String
});

const roleModel=mongoose.model("Roles",role)
module.exports = roleModel;