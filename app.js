const express = require("express");
const app = express();
const {
  getPlayers,
  getSpecificPlayer,
} = require("./controllers/playersController");
const { getLeagues } = require("./controllers/leaguesController");
const { getTeams } = require("./controllers/teamsController");
const { getAllManagers } = require("./controllers/managersController");
const { getOrganiser } = require("./controllers/organisersController");

app.get("/api/players", getPlayers);
app.get("/api/players/:player_id", getSpecificPlayer);

app.get("/api/managers", getAllManagers);

app.get("/api/teams", getTeams);

app.get("/api/leagues", getLeagues);

app.get("/api/organisers", getOrganiser);

module.exports = { app };
