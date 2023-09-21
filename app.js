import  MyServer from "./src/server/models/server.js";
import cluster from 'cluster';
import { cpus } from 'os';
import logger from './src/helpers/helpersLoggers.js';

// AUMETAR PROCESAMIENTO DEL SERVIDOR
//const processors = cpus().length; // 8 en total
const processors = 2

if (cluster.isPrimary) {
	for (let i = 0; i < processors; i++) {
		cluster.fork();
	}
} else {
	logger.info(`Child process started with PID '${process.pid}'`);
	const server = new MyServer();
    server.listen();
}


