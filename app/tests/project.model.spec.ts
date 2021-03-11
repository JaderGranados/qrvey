import * as mongoose from 'mongoose';
import * as config from 'config';
import ProjectModel from '../data/models/project';
const dbConfig = config.get<string>('qrvey.connectionString');

describe ('Query methods from "project.ts"', () => {
    beforeAll((done) => {
        ProjectModel.remove({});
        mongoose.connect(dbConfig);
        done();
    });

    afterEach((done) => {
        ProjectModel.remove({});
        done();
    });

    afterAll((done) => {
        mongoose.connection.close();
        done();
    });

    it('Has a module', () => {
        expect(ProjectModel).toBeDefined();
    });

    it('Get a project', async () => {
        try {
            const project = new ProjectModel({name: "Proyect 1" });
            await project.save();
        }
        catch(error){
            expect(error.message).toEqual("projects validation failed: user: You should specify user id.");
        }
    });
});