const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const postsRouter = require("./routes/posts.routes");
const userRouter = require("./routes/user.router");
const chatRouter = require("./routes/chat.router");
const themeRouter = require("./routes/theme.router");

const app = express();

app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/posts", postsRouter);
app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);

module.exports = app;
