const express = require("express");
const { getPlayers } = require("./controllers/playersController");
const { getTeams } = require("./controllers/teamsController");
const { getAllManagers } = require("./controllers/managersController");
const app = express();
app.get("/api/players", getPlayers);
app.get("/api/managers", getAllManagers);

app.get("/api/teams", getTeams);

module.exports = { app };
