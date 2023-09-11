import winston from 'winston';
import dotenv from 'dotenv';

const customLevelOptions = {
	levels: {
		fatal: 0,
		error: 1,
		warn: 2,
		info: 3,
		http: 4,
		debug: 5,
	},
	colors: {
		fatal: 'magenta',
		error: 'red',
		warn: 'yellow',
		info: 'blue',
		http: 'green',
		debug: 'white',
	},
};

dotenv.config();
const environment = process.env.NODE_ENV;
let logger;

if (environment.trim() == 'development') {
	logger = winston.createLogger({
		levels: customLevelOptions.levels,
		transports: [
			new winston.transports.Console({
				level: 'info',
				format: winston.format.combine(
					winston.format.colorize({ colors: customLevelOptions.colors }),
					winston.format.simple()
				),
			}),
			new winston.transports.File({
				filename: './logs/errors.log',
				level: 'error',
				format: winston.format.simple(),
			}),
			new winston.transports.File({
				filename: './logs/debug.log',
				level: 'debug',
				format: winston.format.simple(),
			}),
		],
	});
} else if (environment.trim() == 'local') {
	logger = winston.createLogger({
		levels: customLevelOptions.levels,
		transports: [
			new winston.transports.Console({
				level: 'debug',
				format: winston.format.combine(
					winston.format.colorize({ colors: customLevelOptions.colors }),
					winston.format.simple()
				),
			}),
		],
	});
} else {
	logger = winston.createLogger({
		levels: customLevelOptions.levels,
		transports: [
			new winston.transports.Console({
				level: 'info',
				format: winston.format.combine(
					winston.format.colorize({ colors: customLevelOptions.colors }),
					winston.format.simple()
				),
			}),
		],
	});
}
export const addLogger = ((req,res,next) =>{
    req.logger = logger
    req.logger.http(`${req.method} en ${req.url} - ${new Date()}`)
    next()
})

export default logger;