import { Schema, model } from 'mongoose';
import schemaBase from './schema-base';
import {created, ended, paused, started } from './task-status';
const timesRecordString = [created, ended, paused, started];
timesRecordString.push('RESTARTED');

const TimeRecordSchema = new Schema({
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

var TimeRecordModel = model('timerecords', TimeRecordSchema);
export default TimeRecordModel;