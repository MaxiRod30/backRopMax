import express from 'express';
import router from "../../routes/index.js";
import handlebars from "express-handlebars";
import Handlebars from 'handlebars';
import __dirname from "../../util.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { socketController } from "../../controllers/sockets/sockets.controller.js"
import passport from 'passport';
import inilitializePassport from '../../middlewares/passportConfig.js';
import cookieParser from "cookie-parser";
import { port } from "../../config/app.config.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import { dbMongoAtlas } from "../../config/db.config.js"
import cors from "cors";
import morgan from 'morgan';
import logger, { addLogger } from '../../helpers/helpersLoggers.js';
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";
import { swaggerOptions } from '../../config/swagger.config.js';

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


        // Session
        this.sesion();

        //Middlewares
        this.middlewares();

        // Config swagger
        this.swagger();

        //Handlebars
        this.handlebars();

        //Cookies
        this.cookies();

        // Rutas de mi aplicación
        this.routes();

        // Sockets
        this.sockets();

    }

    swagger() {

        const specs = swaggerJSDoc(swaggerOptions);
        this.app.use("/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

    }

    sesion() {
        this.app.use(session({
            store: MongoStore.create({
                mongoUrl: dbMongoAtlas,
                ttl: 3600
            }),
            secret: "mAx%17Zrt2a",
            resave: false,
            saveUninitialized: false,
        }));
    }

    cookies() {

        this.app.use(cookieParser())

    }

    handlebars() {
        Handlebars.registerHelper('ifEqual', (a, b, options) => {
            return a === b ? options.fn(this) : options.inverse(this);
        });
        
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

        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(addLogger)
    }

    routes() {

        this.app.use("/", router);

    }

    sockets() {

        this.io.on('connection', socket => { socketController(socket, this.io) });

    }

    listen() {
        this.server.listen(this.port, () => {
            logger.info(`Servidor corriendo en puerto ${this.port}`)
        });
    }
}

