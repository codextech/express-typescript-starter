
import express from 'express';

import Locals from './Locals';
import Routes from './Routes';
import errorHandler from "../exception/Error";

import CORS from '../middlewares/CORS';
import Http from '../middlewares/Http';
import Statics from '../middlewares/Statics';

class Express {
	/**
	 * Create the express object
	 */
	public express: express.Application;

	/**
	 * Initializes the express server
	 */
	constructor () {
		this.express = express();

		this.mountDotEnv();
		this.mountMiddlewares();
		this.mountRoutes();
	}

	private mountDotEnv (): void {
		this.express = Locals.init(this.express);
	}

	/**
	 * Mounts all the defined middlewares
	 */
	private mountMiddlewares (): void {
		// Check if CORS is enabled
		if (Locals.config().isCORSEnabled) {
			// Mount CORS middleware
		this.express = CORS.mount(this.express);
		}

		// Mount basic express apis middleware
		this.express = Http.mount(this.express);


		// Mount statics middleware
		this.express = Statics.mount(this.express);

	}

	/**
	 * Mounts all the defined routes
	 */
	private mountRoutes (): void {
		this.express = Routes.mountApi(this.express);
	}

	/**
	 * Starts the express server
	 */
	public init (): any {
		const port: number = Locals.config().port;

		// Registering Exception / Error Handlers
		this.express.use(errorHandler);

		// Start the server on the specified port
		this.express.listen(port, (_error: any) => {
			if (_error) {
				return console.log('Error: ', _error);
			}

			return console.log('\x1b[33m%s\x1b[0m', `Server :: Running @ 'http://localhost:${port}'`);
		});
	}
}

/** Export the express module */
export default new Express();
