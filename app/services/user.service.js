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
    },
    get: async () => {
        try{
            const result = await UserModel.aggregate([
                {$lookup: {
                    from: 'projects',
                    localField: 'projects',
                    foreignField: '_id',
                    as: 'projects'
                }},
                {$unwind: {
                    path: "$projects",
                    preserveNullAndEmptyArrays: true}
                },
                {$lookup: {
                    from: 'tasks',
                    localField: 'projects.tasks',
                    foreignField: '_id',
                    as: 'projects.tasks'
                }},
                {$group: {
                    _id: '$_id',
                    name: {$first: '$name'},
                    username: {$first: '$username'},
                    lastName: {$first: '$lastName'},
                    projects: {$push: {
                        _id: '$projects._id',
                        name: '$projects.name',
                        tasks: '$projects.tasks',
                        duration: { $sum: '$projects.tasks.duration'}
                    }},
                    duration: {$sum: {$sum: '$projects.tasks.duration'}}
                }},
                {$project: {
                    _id: 1, 
                    name: 1, 
                    lastName: 1,
                    username: 1,
                    projects: 1,
                    duration: 1
                }}
            ]);

            return result;
        }
        catch (error){
            throw error;
        }
    },
    update: async (userId, values) => {
        try {
            const userExists = await UserModel.exists({_id: userId});
            if (!userExists){
                throw new Error("User id is not correct.");
            }

            return await UserModel.findByIdAndUpdate(userId, values, {new: true});
        }
        catch (error){
            throw error;
        }
    }
}