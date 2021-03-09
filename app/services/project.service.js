const mongoose = require('mongoose');
const ProjectModel = require('../data/models/project');
const UserModel = require('../data/models/user');
const TaskModel = require('../data/models/task');

module.exports = {
    create: async project => {
        try {
            var userExists = await UserModel.exists({'_id': project.user});
            if(!userExists){
                throw new Error("User id is not correct")
            }
            const model = new ProjectModel(project);
            var newProject = await model.save();
            const projectObject = newProject.toObject();
            await UserModel.findByIdAndUpdate(project.user, {'$push': {'projects': newProject._id}}, {safe: true, new: true})
                .populate('projects')
                .exec();
            return projectObject;
        }
        catch (error){
            throw error;
        }
    },
    getByUserId: async userId => {
        try{
            const projects = await ProjectModel.aggregate([
                {$lookup: {
                    from: 'users',
                    localField: 'user',
                    foreignField: '_id',
                    as: 'user'
                }},
                {$unwind: '$user'},
                {$match: {'user._id' : mongoose.Types.ObjectId(userId)}},
                {$lookup: {
                    from: 'tasks',
                    localField: 'tasks',
                    foreignField: '_id',
                    as: 'tasks'
                }},
                {$unwind: '$tasks'},
                {$group: {
                    _id: {
                        _id: '$_id', 
                        name: '$name', 
                        userFullname: {$concat: ['$user.name',' ','$user.lastName']}
                    },
                    duration: {$sum: '$tasks.duration'}
                }}
            ]);
            return projects;
        }
        catch (error){
            throw error;
        }
    },
    createTasks: async (projectId, tasks) => {
        try{
            const exists = ProjectModel.exists({'_id': projectId});
            const result = [];
            if (!exists){
                throw new Error("Project id is not correct");
            }

            if(!Array.isArray(tasks)){
                throw new Error("Should send a list of tasks.");
            }

            tasks.forEach(async (value, index) => {
                if (value.hours || value.minutes || value.seconds ){
                    value.hours = value.hours * 3600 || 0;
                    value.minutes = value.minutes * 36 || 0;
                    value.seconds = value.seconds || 0;

                    value.duration = value.hours + value.minutes + value.seconds;
                }

                const taskmodel = await TaskModel.create({
                    name: value.name, 
                    duration: value.duration, 
                    project: projectId, 
                    status: value.status
                });
                result.push(taskmodel.toObject());
                await ProjectModel.findByIdAndUpdate(projectId, {'$push': {'tasks': taskmodel._id}}, {safe: true, new: true})
                .populate('tasks')
                .exec();
            });
            return await new Promise((res, rej) => {
                res(result);
            });
        }
        catch (error){
            throw error;
        }
    },
    update: async (projectId, values) => {
        try {
            const projectExists = await ProjectModel.exists({_id: projectId});
            if (!projectExists){
                throw new Error("Project id is not correct.");
            }
            if (values.user){
                const userExists = await UserModel.exists({_id: values.user, 'projects': {$ne: projectId}});
                if (!userExists){
                    throw new Error("User already has this project or doesn't exist.");
                }
                await UserModel.findOneAndUpdate({'projects': projectId}, {$pull: {'projects': projectId}});
                await UserModel.findByIdAndUpdate(values.user, {$push: {'projects': projectId}});
            }
            return await ProjectModel.findByIdAndUpdate(projectId, values, {new: true});
        }
        catch (error){
            throw error;
        }
    }
}