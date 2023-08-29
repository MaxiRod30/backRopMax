import mongoose from 'mongoose';
import { dbMongoAtlas } from '../../config/db.config.js';

const mongoConnect = async() => {
    try {
        console.log('Conectando ...');
        await mongoose.connect(dbMongoAtlas);
        console.log('Base de datos online');
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de conectar la base de datos');
    }
}

export default mongoConnect;
