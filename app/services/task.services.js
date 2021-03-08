const ProjectModel = require('../data/models/project');
const TaskModel = require('../data/models/task');
const taskStatus = require('../data/models/task-status')

module.exports = {
    create: async task => {
        const model = new TaskModel(task);
        try {
            var newTask = await model.save();
            await ProjectModel.findByIdAndUpdate(task.project, {'$push': {'tasks': newTask._id}}, {safe: true, new: true})
                .populate('tasks')
                .exec();
            return newTask;
        }
        catch (error){
            throw error;
        }
    },
    getByUserId: async userId => {
        try{
            console.log(userId);
            const tasks = await TaskModel.aggregate([
                {$lookup: {
                    from: 'projects',
                    localField: 'project',
                    foreignField: '_id',
                    as: 'project'
                  }},
                {$lookup: {
                    from: 'users',
                    localField: 'project.user',
                    foreignField: '_id',
                    as: 'user'
                  }},
                {$project: {
                    '_id': 1,
                    'name': 1,
                    'duration': 1,
                    'status': 1,
                    'createAt': 1,
                    'project': {
                        name: 1
                    },
                    'user': {
                        name: 1,
                        lastname: 1
                    }
                }},
                {'$sort': {'createAt': -1}}
            ]);
            return tasks;
        }
        catch (error){
            throw error;
        }
    },
    startATask: async taskId => {
        try{
            const task = await TaskModel.findOne({_id: taskId});
            if (!task){
                throw new Error(`Couldn't get the task with id ${taskId}`);
            } else if (task.toObject().status != taskStatus.created && task.toObject().status != taskStatus.paused){
                throw new Error("You cannot start this task.");
            }
            console.log(task.status);
            return await TaskModel.findByIdAndUpdate(taskId, {startDate: Date.now(), status: taskStatus.started}, {new: true});
        }
        catch (err){
            throw err;
        }
    },
    pauseATask: async taskId => {
        try{
            const task = await TaskModel.findOne({_id: taskId});
            if (!task){
                throw new Error(`Couldn't get the task with id ${taskId}`);
            } else if (task.toObject().status != taskStatus.started){
                throw new Error("You cannot pause this task.");
            } else if (!task.toObject().startDate){
                throw new Error("Cannot access to start date");
            }
            
            var sec = Math.abs(Date.now() - task.startDate)/1000
            sec += task.toObject().duration;
            return await TaskModel.findByIdAndUpdate(taskId, {status: taskStatus.paused, duration: sec}, {new: true});
        }
        catch (err){
            throw err;
        }
    },
    stopATask: async taskId => {
        try{
            const task = await TaskModel.findOne({_id: taskId});
            if (!task){
                throw new Error(`Couldn't get the task with id ${taskId}`);
            } else if (task.toObject().status == taskStatus.created || task.toObject().status == taskStatus.ended){
                throw new Error("You cannot stop this task.");
            } else if (!task.toObject().startDate){
                throw new Error("Cannot access to start date");
            }
            
            const updates = {};

            if (task.toObject().status == taskStatus.started){
                var sec = Math.abs(Date.now() - task.startDate)/1000
                sec += task.toObject().duration;
                updates.duration = sec;
            }

            updates.status = taskStatus.ended;
            return await TaskModel.findByIdAndUpdate(taskId, updates, {new: true});
        }
        catch (err){
            throw err;
        }
    },
    restartATask: async taskId => {
        try{
            const task = await TaskModel.findOne({_id: taskId});
            if (!task){
                throw new Error(`Couldn't get the task with id ${taskId}`);
            } else if (task.toObject().status == taskStatus.created){
                throw new Error("You cannot restart this task.");
            }
            
            return await TaskModel.findByIdAndUpdate(taskId, {status: taskStatus.created, duration: 0, startDate: null}, {new: true});
        }
        catch (err){
            throw err;
        }
    }
}