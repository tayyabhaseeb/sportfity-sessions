const express = require("express");
const app = express();
const { getPlayers } = require("./controllers/playersController");
const { getLeagues } = require("./controllers/leaguesController");
const { getTeams } = require("./controllers/teamsController");
const { getAllManagers } = require("./controllers/managersController");
const { getOrganiser } = require("./controllers/organisersController");
const { getMatches } = require("./controllers/matchesController");
const { getTeamsById } = require("./controllers/teamsController");

app.get("/api/players", getPlayers);

app.get("/api/managers", getAllManagers);

app.get("/api/teams", getTeams);

app.get("/api/leagues", getLeagues);

app.get("/api/organisers", getOrganiser);

app.get("/api/matches", getMatches);

app.get("/api/teams/:team_id", getTeamsById);

module.exports = { app };
