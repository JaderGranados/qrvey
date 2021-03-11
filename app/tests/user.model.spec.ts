import * as mongoose from 'mongoose';
import * as config from 'config';
import UserModel from '../data/models/user';
const dbConfig = config.get<string>('qrvey.connectionString');

describe ('Query methods from "user.ts"', () => {
    beforeAll((done) => {
        UserModel.remove({});
        mongoose.connect(dbConfig);
        done();
    });

    afterEach((done) => {
        UserModel.remove({});
        done();
    });

    afterAll((done) => {
        mongoose.connection.close();
        done();
    });

    it('Has a module', () => {
        expect(UserModel).toBeDefined();
    });

    it('Get a user', async () => {
        const project = new UserModel({name: "Jader", lastName: "Granados", username: "jader-granados", password: "Colombias"});
        await project.save();

        const foundUser = await UserModel.findOne({name: "Jader"});
        const expected = "Jader";
        const current = foundUser.name;

        expect(current).toEqual(expected);
    });
});