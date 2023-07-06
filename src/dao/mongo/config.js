import mongoose from 'mongoose';

export const dbConnetion = async() => {
    try {
        console.log('Conectando ...');
        await mongoose.connect(process.env.MONGODB_ATLAS);
        console.log('Base de datos online');
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de conectar la base de datos');
    }
}
