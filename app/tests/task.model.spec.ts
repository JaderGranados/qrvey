import * as mongoose from 'mongoose';
import * as config from 'config';
import TaskModel from '../data/models/task';
const dbConfig = config.get<string>('qrvey.connectionString');

describe ('Query methods from "task.ts"', () => {
    beforeAll((done) => {
        TaskModel.remove({});
        mongoose.connect(dbConfig);
        done();
    });

    afterEach((done) => {
        TaskModel.remove({});
        done();
    });

    afterAll((done) => {
        mongoose.connection.close();
        done();
    });

    it('Has a module', () => {
        expect(TaskModel).toBeDefined();
    });

    it('Get a task', async () => {
        try {
            const project = new TaskModel({name: "task 1" });
            await project.save();
        }
        catch(error){
            expect(error.message).toEqual("tasks validation failed: project: You should specify project id.");
        }
    });
});