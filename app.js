const express = require("express");
const { getPlayers } = require("./controllers/playersController");
const app = express();
const { getLeagues } = require("./controllers/leaguesController");

const { getTeams } = require("./controllers/teamsController");

const { getAllManagers } = require("./controllers/managersController");

app.get("/api/players", getPlayers);
app.get("/api/managers", getAllManagers);

app.get("/api/teams", getTeams);

app.get("/api/leagues", getLeagues);

module.exports = { app };
