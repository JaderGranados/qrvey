const mongoose = require('mongoose')
const schemaBase = require('./schema-base')
const Schema = mongoose.Schema;
const taskStatusEnum = require('./task-status');
const timesRecordString = Object.keys(taskStatusEnum).map(key => {
    return taskStatusEnum[key];
});
timesRecordString.push('RESTARTED');

const TimeRecordModel = new Schema({
    task: {
        type: Schema.Types.ObjectId,
        ref: 'tasks',
        required: [true, "It's necesary"]
    },
    status: {
        type: String,
        required: true,
        enum: timesRecordString,
        default: 'CREATED'
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    ... schemaBase
});

var model = mongoose.model('timerecords', TimeRecordModel);
module.exports = model;