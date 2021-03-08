const mongoose = require('mongoose')
const schemaBase = require('./schema-base')
const Schema = mongoose.Schema;
const taskStatusEnum = require('./task-status');

const TaskSchema = new Schema({
    name: {
        type: String,
        required: false
    },
    startDate: {
        type: Date,
        required: false,
    },
    duration: {
        type: Number,
        required: false
    },
    status:{
        type: String,
        required: true,
        enum: Object.keys(taskStatusEnum).map(key => {
            return taskStatusEnum[key];
        }),
        default: 'CREATED'
    },
    project: {
        required: [true, "You should specify project id."],
        type: Schema.Types.ObjectId,
        ref: 'projects'
    },
    timerecords: [{
        type: Schema.Types.ObjectId,
        ref: 'timerecords'
    }],
    ... schemaBase
});

var model = mongoose.model('tasks', TaskSchema);
module.exports = model;