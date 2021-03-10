import { connect } from 'mongoose';
import * as config from 'config';

export module Database{
    export const Connect = ():void => {
        const dbConfig = config.get('qrvey.connectionString');
        console.log(dbConfig);
        connect(`${dbConfig}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(db => console.log('Database connected on ', db.connection.host))
        .catch(err => console.error(err));
    }
}