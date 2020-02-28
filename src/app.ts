import App from "./providers/App";
import NativeEvent from "./exception/NativeEvent";

// the process events
NativeEvent.process();

App.loadConfiguration();
/**
 * Run the Database pool
 */
App.loadDatabase();

/**
 * Run the Server
 */
App.loadServer();


