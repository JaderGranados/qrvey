const mongoose = require('mongoose');
const ProjectModel = require('../data/models/project');
const TaskModel = require('../data/models/task');
const TimeRecordModel = require('../data/models/time-record');
const taskStatus = require('../data/models/task-status');

module.exports = {
    create: async task => {
        try {
            if(task.hours || task.minutes || task.seconds)
            {
                task.hours = task.hours * (3600) || 0;
                task.minutes = task.minutes * (60) || 0;
                task.seconds = task.seconds || 0;

                task.duration = task.hours + task.minutes + task.seconds;
            }
            var projectExists = await ProjectModel.exists({'_id': task.project});
            if (!projectExists){
                throw new Error("Project id is not correct.");
            }
            const timeRecord = await TimeRecordModel.create({task: taskId, status: 'CREATED'});
            task.timerecords = [timeRecord.toObject()._id];

            const model = new TaskModel(task);
            var newTask = await model.save();
            var taskObject = newTask.toObject();

            await ProjectModel.findByIdAndUpdate(task.project, {'$push': {'tasks': newTask._id}}, {safe: true, new: true})
                .populate('tasks')
                .exec();
            return taskObject;
        }
        catch (error){
            throw error;
        }
    },
    getByUserId: async userId => {
        try{
            const tasks = await TaskModel.aggregate([
                {$lookup: {
                    from: 'projects',
                    localField: 'project',
                    foreignField: '_id',
                    as: 'project'
                  }},
                {$unwind: '$project'},
                {$lookup: {
                    from: 'users',
                    localField: 'project.user',
                    foreignField: '_id',
                    as: 'user'
                  }},
                {$unwind: '$user'},
                {$match: {'user._id' : mongoose.Types.ObjectId(userId)}},
                {$project: {
                    '_id': 1,
                    'name': {
                        $ifNull: ['$name', 'No named']
                    },
                    'duration': {
                        $ifNull: ['$duration', 0]
                    },
                    'status': 1,
                    'createAt': 1,
                    'project': '$project.name',
                    'user': {
                        name: 1,
                        lastName: 1
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
            const timerecord = await TimeRecordModel.create({task: taskId, status: 'STARTED'});
            return await TaskModel.findByIdAndUpdate(taskId, {startDate: Date.now(), status: taskStatus.started, '$push': {'timerecords': timerecord._id}}, {new: true});
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
            const timerecord = await TimeRecordModel.create({task: taskId, status: 'PAUSED'});
            return await TaskModel.findByIdAndUpdate(taskId, {status: taskStatus.paused, duration: sec, '$push': {'timerecords': timerecord._id}}, {new: true});
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
            const timerecord = await TimeRecordModel.create({task: taskId, status: 'ENDED'});

            return await TaskModel.findByIdAndUpdate(taskId, {
                ...updates,
                '$push': {'timerecords': timerecord._id}
            }, {new: true});
        }
        catch (err){
            throw err;
        }
    },
    restartATask: async taskId => {
        try{
            const task = await TaskModel.findOne({_id: taskId});
            const taskObject = task.toObject();
            if (!task){
                throw new Error(`Couldn't get the task with id ${taskId}`);
            } else if (task.toObject().status == taskStatus.created){
                throw new Error("You cannot restart this task.");
            }

            const timerecord = await TimeRecordModel.create({task: taskId, status: 'RESTARTED'});
            var result =  await TaskModel.findByIdAndUpdate(taskId, 
                {status: taskStatus.created, duration: 0, startDate: null, '$push': {'timerecords': timerecord._id}}, 
                {new: true, });
            result = result.toObject();

            return result;
        }
        catch (err){
            throw err;
        }
    },
    update: async (taskId, values) => {
        try {
            const taskExists = await TaskModel.exists({_id: taskId});
            if (!taskExists){
                throw new Error("Task id is not correct.");
            }
            if(task.hours || task.minutes || task.seconds)
            {
                task.hours = task.hours * (3600) || 0;
                task.minutes = task.minutes * (60) || 0;
                task.seconds = task.seconds || 0;

                task.duration = task.hours + task.minutes + task.seconds;
            }
            if (values.project){
                const projectExists = await ProjectModel.exists({_id: values.project, 'tasks': {$ne: taskId}});
                console.log(projectExists);
                if (!projectExists){
                    throw new Error("Project already has this task or doesn't exist.");
                }
                await ProjectModel.findOneAndUpdate({tasks: taskId}, {$pull: {'tasks': taskId}});
                await ProjectModel.findByIdAndUpdate(values.project, {$push: {'tasks': taskId}});
            }
            return await TaskModel.findByIdAndUpdate(taskId, values, {new: true});
        }
        catch (error){
            throw error;
        }
    }
}