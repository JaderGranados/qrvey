import { connect } from 'mongoose';

export module Database{
    export const Connect = ():void => {
        connect('mongodb://mongo/mydatabase', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(db => console.log('Database connected on ', db.connection.host))
        .catch(err => console.error(err));
    }
}