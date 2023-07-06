
import 'dotenv/config.js'

import  MyServer from "./src/dao/server/models/server.js";

const server = new MyServer();

server.listen();