const express = require("express");
const { getPlayers } = require("./controllers/playersController");
const { getAllManagers } = require("./controllers/managersController");
const app = express();

app.get("/api/players", getPlayers);
app.get("/api/managers", getAllManagers);

module.exports = { app };
