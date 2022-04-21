import express from 'express';
import http from 'http';
import { Server } from  "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const port = process.env.PORT || 3009

app.get('/', (req, res) => {
   res.send("OK!!!");
});

io.on('connection', (socket) => {
   console.log('a user connected');
});

server.listen(port, () => {
   console.log('listening on *:3009');
});

//  git push heroku main
