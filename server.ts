import dotenv from 'dotenv';
import debug from "debug";
import http from "http";
import {app} from "./app";

const dotenvResult = dotenv.config();
if (dotenvResult.error) {
    throw dotenvResult.error;
}

const debugLog: debug.IDebugger = debug('app');
const PORT: number = parseInt(process.env.PORT as string, 10);
let server: http.Server = http.createServer(app);

export default server.listen(PORT, () => {
    debugLog(`Server running at http://localhost:${PORT}`);
});
