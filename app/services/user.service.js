const UserModel = require('../data/models/user')

module.exports = {
    create: async user => {
        const model = UserModel(user);
        try {
            const newUser = await model.save();
            return newUser;
        }
        catch (error){
            throw error;
        }
    }
}