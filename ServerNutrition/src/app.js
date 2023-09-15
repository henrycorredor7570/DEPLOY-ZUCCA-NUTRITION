const express = require("express");
//const http = require("http");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
//const { Server } = require("socket.io");
require("./db.js");

const server = express();
/* const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173"
  }
})
io.on('connection', (socket) => {
  console.log('usuario conectado', socket.id);
  socket.on('disconnect', () => {
    console.log("usuario desconectado");
  })
}); */
server.name = "API";

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use("/", routes);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

// Eventos de webSocket



module.exports = server;
