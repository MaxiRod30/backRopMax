import { port, url } from '../config/app.config.js';
import __dirname from '../util.js';


export const swaggerOptions = {
    definition: {
        openapi: '3.1.0',
        info: {
            title: 'Ecommerce RopMax',
            version: '1.0.0',
            description: 'La documentación de los endpoints',
            contact: {
                name: 'Maximiliano Rodriguez',
                email: "max.edw.rod@gmail.com",
            },
        },
        servers: [
            {
                url: `${url}:${port}`,
            },
        ],
        externalDocs: {
            description: 'Volver al sitio web',
            target: '_self',
            url: '/',
        },
    },
    apis: [
        `${__dirname}/docs/**/*.yaml`,
    ],
};