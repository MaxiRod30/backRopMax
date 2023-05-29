import express from 'express';
import routerProducts from "../routes/routeProducts.js"

export default class Server {

    constructor() {
        this.app  = express();
        this.port = 8080;
        this.productsPath = '/products';

        // Rutas de mi aplicación
        this.routes();
    }

    routes() {
        this.app.use(this.productsPath, routerProducts);
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}

