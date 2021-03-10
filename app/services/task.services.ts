import { Types } from "mongoose";
import ProjectModel from "../data/models/project";
import TaskModel from "../data/models/task";
import TimeRecordModel from "../data/models/time-record";
import { created, started, ended, paused } from "../data/models/task-status";
import TaskInterface from "../data/interfaces/task.interface";

export default {
  create: async (task: TaskInterface) => {
    try {
      if (task.hours || task.minutes || task.seconds) {
        task.hours = task.hours != undefined ? task.hours * 3600 : 0;
        task.minutes = task.minutes != undefined ? task.minutes * 60 : 0;
        task.seconds = task.seconds || 0;

        task.duration = task.hours + task.minutes + task.seconds;
      }
      var projectExists = await ProjectModel.exists({ _id: task.project });
      if (!projectExists) {
        throw new Error("Project id is not correct.");
      }

      const model = new TaskModel(task);
      var newTask = await model.save();
      const timeRecord = await TimeRecordModel.create({
        task: newTask._id,
        status: "CREATED",
      });
      task.timerecords = [timeRecord.toObject()._id];
      var taskObject = newTask.toObject();

      await ProjectModel.findByIdAndUpdate(
        task.project,
        { $push: { tasks: newTask._id } },
        { new: true }
      )
        .populate("tasks")
        .exec();
      return taskObject;
    } catch (error) {
      throw error;
    }
  },
  getByUserId: async (userId: string) => {
    try {
      const tasks = await TaskModel.aggregate([
        {
          $lookup: {
            from: "projects",
            localField: "project",
            foreignField: "_id",
            as: "project",
          },
        },
        { $unwind: "$project" },
        {
          $lookup: {
            from: "users",
            localField: "project.user",
            foreignField: "_id",
            as: "user",
          },
        },
        { $unwind: "$user" },
        { $match: { "user._id": Types.ObjectId(userId) } },
        {
          $project: {
            _id: 1,
            name: {
              $ifNull: ["$name", "No named"],
            },
            duration: {
              $ifNull: ["$duration", 0],
            },
            status: 1,
            createAt: 1,
            project: "$project.name",
            user: {
              name: 1,
              lastName: 1,
            },
          },
        },
        { $sort: { createAt: -1 } },
      ]);
      return tasks;
    } catch (error) {
      throw error;
    }
  },
  startATask: async (taskId: string) => {
    try {
      const task = await TaskModel.findOne({ _id: taskId });
      if (!task) {
        throw new Error(`Couldn't get the task with id ${taskId}`);
      } else if (task.status != created && task.status != paused) {
        throw new Error("You cannot start this task.");
      }
      const timerecord = await TimeRecordModel.create({
        task: taskId,
        status: "STARTED",
      });
      return await TaskModel.findByIdAndUpdate(
        taskId,
        {
          startDate: new Date(),
          status: started,
          $push: { timerecords: timerecord._id },
        },
        { new: true }
      );
    } catch (err) {
      throw err;
    }
  },
  pauseATask: async (taskId: string) => {
    try {
      const task = await TaskModel.findOne({ _id: taskId });
      if (!task) {
        throw new Error(`Couldn't get the task with id ${taskId}`);
      } else if (task.toObject().status != started) {
        throw new Error("You cannot pause this task.");
      } else if (!task.toObject().startDate) {
        throw new Error("Cannot access to start date");
      }

      var sec = 0;
      if (task.startDate != undefined) {
        sec = Math.abs(Date.now() - task.startDate.getMilliseconds()) / 1000;
      }
      sec += task.duration != undefined ? task.duration : 0;
      const timerecord = await TimeRecordModel.create({
        task: taskId,
        status: "PAUSED",
      });
      return await TaskModel.findByIdAndUpdate(
        taskId,
        {
          status: paused,
          duration: sec,
          $push: { timerecords: timerecord._id },
        },
        { new: true }
      );
    } catch (err) {
      throw err;
    }
  },
  stopATask: async (taskId: string) => {
    try {
      const task = await TaskModel.findOne({ _id: taskId });
      if (!task) {
        throw new Error(`Couldn't get the task with id ${taskId}`);
      } else if (
        task.toObject().status == created ||
        task.toObject().status == ended
      ) {
        throw new Error("You cannot stop this task.");
      } else if (!task.toObject().startDate) {
        throw new Error("Cannot access to start date");
      }

      var updates: {
        duration?: number;
        status: string;
      } = {
        status: ended,
      };

      if (task.toObject().status == started) {
        var sec = 0;
        if (task.startDate != undefined) {
          sec = Math.abs(Date.now() - task.startDate.getMilliseconds()) / 1000;
        }
        sec += task.duration != undefined ? task.duration : 0;
        updates.duration = sec;
      }

      const timerecord = await TimeRecordModel.create({
        task: taskId,
        status: "ENDED",
      });

      return await TaskModel.findByIdAndUpdate(
        taskId,
        {
          ...updates,
          $push: { timerecords: timerecord._id },
        },
        { new: true }
      );
    } catch (err) {
      throw err;
    }
  },
  restartATask: async (taskId: string) => {
    try {
      const task = await TaskModel.findOne({ _id: taskId });
      if (!task) {
        throw new Error(`Couldn't get the task with id ${taskId}`);
      } else if (task.status == created) {
        throw new Error("You cannot restart this task.");
      }

      const timerecord = await TimeRecordModel.create({
        task: taskId,
        status: "RESTARTED",
      });
      var result = await TaskModel.findByIdAndUpdate(
        taskId,
        {
          status: created,
          duration: 0,
          startDate: undefined,
          $push: { timerecords: timerecord._id },
        },
        { new: true }
      );

      return result;
    } catch (err) {
      throw err;
    }
  },
  update: async (taskId: string, values: TaskInterface) => {
    try {
      const taskExists = await TaskModel.exists({ _id: taskId });
      if (!taskExists) {
        throw new Error("Task id is not correct.");
      }
      if (values.hours || values.minutes || values.seconds) {
        values.hours = values.hours != undefined ? values.hours * 3600 : 0;
        values.minutes = values.minutes != undefined ? values.minutes * 60 : 0;
        values.seconds = values.seconds || 0;

        values.duration = values.hours + values.minutes + values.seconds;
      }
      if (values.project) {
        const projectExists = await ProjectModel.exists({
          _id: values.project,
          tasks: { $ne: taskId },
        });
        console.log(projectExists);
        if (!projectExists) {
          throw new Error("Project already has this task or doesn't exist.");
        }
        await ProjectModel.findOneAndUpdate(
          { tasks: taskId },
          { $pull: { tasks: taskId } }
        );
        await ProjectModel.findByIdAndUpdate(values.project, {
          $push: { tasks: taskId },
        });
      }
      return await TaskModel.findByIdAndUpdate(taskId, values, { new: true });
    } catch (error) {
      throw error;
    }
  },
};
