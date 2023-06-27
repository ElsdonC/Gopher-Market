require("dotenv").config({ path: `${__dirname}/config/.env` });
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT;
const db = require("./config/database");
const passport = require("passport");
const session = require("express-session");
require("./config/passport");

const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
  // ...
});

io.on('connection', (socket) => {
    console.log('A user connected');
  
    // Event when a message is sent
    socket.on('chat message', (msg) => {
      console.log('Message:', msg);
      // Broadcast the message to all connected clients
      io.emit('chat message', msg);
    });
  
    // Event when a user is typing
    socket.on('typing', (username) => {
      console.log(`${username} is typing...`);
      // Broadcast the typing status to all connected clients except the sender
      socket.broadcast.emit('typing', username);
    });
  
    // Event when a user disconnects
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });
  

app.set("view engine", "ejs");
app.set("views", "public/views");
app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//DB
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("DB Connected"));

//Auth
app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false },
    })
);
app.use(passport.authenticate('session'));
app.use(passport.initialize());
app.use(passport.session());

// Routes
const authRouter = require("./routes/auth");
const loginRouter = require("./routes/login");
const logoutRouter = require("./routes/logout");
const indexRouter = require("./routes/index");
const sellRouter = require("./routes/sell");
const userItemsRouter = require("./routes/userItems");
const bookmarkedRouter = require("./routes/bookmarked");

app.use("/auth", authRouter);
app.use("/", indexRouter);
app.use("/sell", sellRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/userItems", userItemsRouter);
app.use("/bookmarked", bookmarkedRouter);

httpServer.listen(PORT || process.env.PORT, () => {
    console.log(`Server started on port ${PORT}`)
});