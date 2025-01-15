const express = require("express");
const app = express();

const playersRouter = require("./routers/playersRouter");

// app.get("/api/players", getPlayers);

app.use(express.json());

app.use("/api/players", playersRouter);
