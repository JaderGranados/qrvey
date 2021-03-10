import { Schema, model } from 'mongoose';
import { ProjectInterface } from '../interfaces/project.interface';
import schemaBase from './schema-base';


const ProjectSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required."]
    },
    user: {
        required: [true, "You should specify user id."],
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: 'tasks'
    }],
    ... schemaBase
});

var ProjectModel = model<ProjectInterface>('projects', ProjectSchema);
export default ProjectModel;