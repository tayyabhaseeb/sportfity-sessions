const express = require("express");
const app = express();
const { getOrganiser } = require("./controllers/organisersController");
const { getPlayers } = require("./controllers/playersController");

app.get("/api/players", getPlayers);

app.get("/api/organisers", getOrganiser);

module.exports = { app };
