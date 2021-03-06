
import mongoose from 'mongoose';
import  bluebird from 'bluebird';
import { MongoError } from 'mongodb';

import Locals from './Locals';
import Log from '../middlewares/Log';

export class Database {
	// Initialize your database pool
	public static init (): any {
		const connString = Locals.config().mongooseUrl;
		console.log('#######', connString);
		
		const options = { useNewUrlParser: true, useUnifiedTopology: true };

		(<any>mongoose).Promise = bluebird;

		mongoose.set('useCreateIndex', true);

		mongoose.connect(connString, options, (error: MongoError) => {
			// handle the error case
			if (error) {
				Log.info('Failed to connect to the Mongo server!!');
				console.log(error);
				throw error;
			} else {
				Log.info('connected to mongo server at: ' + connString);
			}
		});
	}
}

export default mongoose;
