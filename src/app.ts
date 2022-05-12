import http from 'http';
import express from 'express';
import {Server} from "socket.io";

const port = 8080;
const messages = [
   {message: "1111111111111"},
   {message: "2222222222222"},
];

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
   cors: {
      origin: "*",
   },
});


app.get('/', (req, res) => {
   res.send("OK!!!");
});

io.on('connection', (socket) => {
   console.log('a user connected');
   socket.on('client-message-sent', (payload) => {
      console.log(payload);
      messages.push(payload);
      io.emit('new-message-sent', payload);
   });
   socket.emit('init-messages-loaded', messages);
});

server.listen(port, () => {
   console.log('listening on *:8080');
});

//  git push heroku main
