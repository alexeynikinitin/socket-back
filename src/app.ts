import http from 'http';
import express from 'express';
import {Server} from "socket.io";

const port = process.env.PORT || 8080;
const messages = [
   {message: "1111111111111", user: { id: "1", name: "Alex" }},
   {message: "2222222222222", user: { id: "2", name: "Alex" }},
];

const map = new Map();

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

map.set(io, {message: "", user: { id: new Date().getTime().toString(), name: "anonymous" }});

io.on('connection', (socket) => {
   console.log('a user connected');
   socket.on('client-name-set', (name) => {
      if (typeof name === "string")
         map.get(io).user.name = name
   });
   socket.on('client-message-sent', (message) => {
      if (typeof message !== "string")
         return;
      console.log(message);
      const newMessage = {
         message,
         user: {
            id: new Date().getTime().toString(),
            name: map.get(io).user.name
         }
      }
      messages.push(newMessage);
      io.emit('new-message-sent', newMessage);
   });
   socket.emit('init-messages-loaded', messages);
});

server.listen(port, () => {
   console.log('listening on *:8080');
});

//  git push heroku main
//  heroku git:remote -a socket-chat-back
