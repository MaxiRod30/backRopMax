import mongoose from 'mongoose';
import { dbMongoAtlas } from '../../config/db.config.js';
import logger from '../../helpers/helpersLoggers.js';

const mongoConnect = async() => {
    try {
        logger.info(`Conectando ...`)
        await mongoose.connect(dbMongoAtlas);
        logger.info(`Base de datos online`)

    } catch (error) {
        logger.fatal(`Error base de datos ${error}`)
    }
}

export default mongoConnect;
