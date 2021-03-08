const mongoose = require('mongoose');
const ProjectModel = require('../data/models/project');
const UserModel = require('../data/models/user');

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
    }
}