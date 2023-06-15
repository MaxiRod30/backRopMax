import express from 'express';
import routerProducts from "../routes/routeProducts.js"
import routerCarts from "../routes/routeCarts.js"
import routerViews from "../routes/routeViews.js"
import handlebars from "express-handlebars";
import __dirname from "../util.js";
import { createServer } from "http";
import {Server} from "socket.io";
import { socketController } from "../controllers/sockets/controllerSockets.js"

export default class MyServer {

    constructor() {
        this.app  = express();
        this.app.use(express.urlencoded({ extended: true }));
        this.server = createServer( this.app );
        this.io     = new Server( this.server );


        this.port = 8080;
        this.productsPath = '/api/products';
        this.cartsPath = '/api/carts';
        this.viewsPath = '/';

        //Handlebars
        this.handlebars();

        //Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        // Sockets
        this.sockets();
    }


    handlebars(){

        this.app.engine("handlebars", handlebars.engine());
        this.app.set("views", __dirname + "/views");
        this.app.set("view engine", "handlebars");
        this.app.use(express.static(__dirname + "/public"));

    }

    middlewares(){
        this.app.use(express.json());
    }

    routes() {
        
        this.app.use(this.productsPath, routerProducts);
        this.app.use(this.cartsPath, routerCarts);
        this.app.use(this.viewsPath, routerViews);
    }

    sockets() {

        this.io.on('connection', socketController );

    }

    listen() {
        this.server.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}

