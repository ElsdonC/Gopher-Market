require("dotenv").config({ path: `${__dirname}/config/.env` });
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT;
const db = require("./config/database");
const passport = require("passport");
const session = require("express-session");
require("./config/passport");

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

// start and listen on the Express server
app.listen(PORT || process.env.PORT, () => {
    console.log(`Express is listening on port ${PORT}`);
});
