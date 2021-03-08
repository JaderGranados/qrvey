const mongoose = require('mongoose')
const schemaBase = require('./schema-base')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required."]
    },
    lastName: {
        type: String,
        required: [true, "Lastname is required."]
    },
    username:{
        type: String,
        required: [true, "Username is required."]
    },
    password:{
        type: String,
        required: [true, "Password is required"],
        select: false
    },
    projects: [{
        type: Schema.Types.ObjectId,
        ref: 'projects'
    }],
    ... schemaBase
});

var model = mongoose.model('users', UserSchema);
module.exports = model;