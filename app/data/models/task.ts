import { Schema, model } from 'mongoose';
import TaskInterface from '../interfaces/task.interface';
import schemaBase from './schema-base';
import { created, ended, paused, started} from './task-status';

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
        enum: [created, ended, paused, started],
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

var TaskModel = model<TaskInterface>('tasks', TaskSchema);
export default TaskModel;