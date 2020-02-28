
import Log from '../middlewares/Log';

class NativeEvent {
	

	public process (): void {
		// Catch the Process's uncaught-exception

		process.on('uncaughtException', (exception: any) =>
			Log.error(exception.stack)
		);

		// Catch the Process's warning event
		process.on('warning', (warning : any) =>
			Log.warn(warning.stack)
		);
	}
}

export default new NativeEvent;
