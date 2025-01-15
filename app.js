const express = require("express");
const app = express();
const { getOrganiser } = require("./controllers/organisersController");

// const playersRouter = require("./routers/playersRouter");

// app.get("/api/players", getPlayers);

// app.use(express.json());

// app.use("/api/players", playersRouter);

app.get("/api/organisers", getOrganiser);

module.exports = { app };
