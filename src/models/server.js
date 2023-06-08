import express from 'express';
import routerProducts from "../routes/routeProducts.js"
import routerCarts from "../routes/routeCarts.js"

export default class Server {

    constructor() {
        this.app  = express();
        this.app.use(express.urlencoded({ extended: true }));


        this.port = 8080;
        this.productsPath = '/api/products';
        this.cartsPath = '/api/carts';

        //Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    middlewares(){
        this.app.use(express.json());
    }

    routes() {
        
        this.app.use(this.productsPath, routerProducts);
        this.app.use(this.cartsPath, routerCarts);
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}

