const { copyFileSync } = require("fs");
const http = require("http");
const server = http.createServer();
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: "*",
  },
});
let socketId = [];
io.on("connection", (socket) => {
  console.log(socket.id);

  socketId.push(socket.id);
  console.log("socketId = ", socketId);
  socket.on("message", (data) => {
    console.log(data);
    io.to(socketId[0]).emit("new-message", data);
    // socket.broadcast.emit("new-message", data);
  });
});

server.listen(3001, () => {
  console.log("hi from ws");
  console.log("server is listening on port 3001");
});
