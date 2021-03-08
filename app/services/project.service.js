const ProjectModel = require('../data/models/project');
const UserModel = require('../data/models/user');

module.exports = {
    create: async project => {
        const model = new ProjectModel(project);
        try {
            var newProject = await model.save();
            await UserModel.findByIdAndUpdate(project.user, {'$push': {'projects': newProject._id}}, {safe: true, new: true})
                .populate('projects')
                .exec();
            return newProject;
        }
        catch (error){
            throw error;
        }
    }
}