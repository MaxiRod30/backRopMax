import express from 'express';
import router from "../../routes/index.js";
import handlebars from "express-handlebars";
import __dirname from "../../util.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { socketController } from "../../controllers/sockets/sockets.controller.js"
import passport from 'passport';
import inilitializePassport from '../../middlewares/passportConfig.js';
import cookieParser from "cookie-parser";
import { port } from "../../config/app.config.js";


export default class MyServer {

    constructor() {
        this.app = express();
        this.app.use(express.urlencoded({ extended: true }));
        this.server = createServer(this.app);
        this.io = new Server(this.server);


        this.port = port;
        this.productsPath = '/api/products';
        this.cartsPath = '/api';
        this.viewsPath = '/';
        this.sessionsPath = '/api/sessions';

 
        //Handlebars
        this.handlebars();

        //Middlewares
        this.middlewares();

        //Cookies
        this.cookies();

        // Rutas de mi aplicación
        this.routes();

        // Sockets
        this.sockets();

    }


    cookies() {

        this.app.use(cookieParser())

    }

    handlebars() {

        this.app.engine("handlebars", handlebars.engine());
        this.app.set("views", __dirname + "/views");
        this.app.set("view engine", "handlebars");
        this.app.use(express.static(__dirname + "/public"));

    }

    middlewares() {
        this.app.use(express.json());

        //Passport
        inilitializePassport();
        this.app.use(passport.initialize())
    }

    routes() {

        this.app.use("/", router);

    }

    sockets() {

        this.io.on('connection', socket => { socketController(socket, this.io) });

    }

    listen() {
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}

