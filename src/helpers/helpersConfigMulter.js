import multer from 'multer';
import logger from '../helpers/helpersLoggers.js';
import __dirname from '../util.js';


const configMulter = (destinationPath) => {
    try {
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, `./${__dirname}/${destinationPath}`);
            },
            filename: (req, file, cb) => {
                const filename =  Date.now() +"_"+ file.originalname;
                cb(null, filename);
            },
        });

        const upload = multer({ storage });

        return upload;
    } catch (error) {
        logger.error('Error en la configuración de Multer', error);        
    }
};

export default configMulter;