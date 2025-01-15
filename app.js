const express = require("express");
const app = express();
const { getOrganiser } = require("./controllers/organisersController");
const { getPlayers } = require("./controllers/playersController");
const { getTeams } = require("./controllers/teamsController");

app.get("/api/players", getPlayers);

app.get("/api/organisers", getOrganiser);

app.get("/api/teams", getTeams);

module.exports = { app };
