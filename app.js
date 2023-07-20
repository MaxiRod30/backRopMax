
import 'dotenv/config.js'

import  MyServer from "./src/server/models/server.js";

const server = new MyServer();

server.listen();