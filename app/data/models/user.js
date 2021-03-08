const mongoose = require('mongoose')
const schemaBase = require('./schema-base')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
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