import { Schema, model } from 'mongoose';
import UserInterface from '../interfaces/user.interface';
import schemaBase from './schema-base';

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

var UserModel = model<UserInterface>('users', UserSchema);
export default UserModel;