import express from 'express';
import routerProducts from "../../routes/routeProducts.js"
import routerCarts from "../../routes/routeCarts.js"
import routerViews from "../../routes/routeViews.js"
import routerSessions from "../../routes/routeSessions.js"
import handlebars from "express-handlebars";
import __dirname from "../../util.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { socketController } from "../../controllers/sockets/controllerSockets.js"
import { dbConnetion } from '../../dao/mongo/config.js'
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from 'passport';
import inilitializePassport from '../../middlewares/passportConfig.js';

export default class MyServer {

    constructor() {
        this.app = express();
        this.app.use(express.urlencoded({ extended: true }));
        this.server = createServer(this.app);
        this.io = new Server(this.server);


        this.port = process.env.PORT;
        this.productsPath = '/api/products';
        this.cartsPath = '/api';
        this.viewsPath = '/';
        this.sessionsPath = '/api/sessions';

        //Conectar a la base de datos
        this.conectarDB();

        //Handlebars
        this.handlebars();
        
        // Session
        this.sesion();

        //Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        // Sockets
        this.sockets();

    }

    sesion() {
        this.app.use(session({
            store: MongoStore.create({
                mongoUrl: process.env.MONGODB_ATLAS,
                ttl: 3600
            }),
            secret: "mAx%17Zrt2a",
            resave: false,
            saveUninitialized: false,
        }));
    }

    async conectarDB() {
        await dbConnetion();
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
        this.app.use(passport.session())
    }

    routes() {

        this.app.use(this.productsPath, routerProducts);
        this.app.use(this.cartsPath, routerCarts);
        this.app.use(this.viewsPath, routerViews);
        this.app.use(this.sessionsPath, routerSessions);
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

