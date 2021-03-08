const mongoose = require('mongoose')
const schemaBase = require('./schema-base')
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: 'tasks'
    }],
    ... schemaBase
});

var model = mongoose.model('projects', ProjectSchema);
module.exports = model;