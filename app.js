const express = require("express");
const app = express();
const {
  getPlayers,
  getSpecificPlayer,
  getPlayersByTeamId,
} = require("./controllers/playersController");

const { getLeagues } = require("./controllers/leaguesController");
const { getTeams } = require("./controllers/teamsController");
const { getAllManagers } = require("./controllers/managersController");
const { getOrganiser } = require("./controllers/organisersController");
const { getMatches, getMatchById } = require("./controllers/matchesController");
const { getTeamsById } = require("./controllers/teamsController");

app.get("/api/players", getPlayers);

app.get("/api/players/:player_id", getSpecificPlayer);

app.get("/api/managers", getAllManagers);

app.get("/api/teams", getTeams);

app.get("/api/leagues", getLeagues);

app.get("/api/organisers", getOrganiser);

app.get("/api/matches", getMatches);

app.get("/api/matches/:match_id", getMatchById);

app.get("/api/teams/:team_id", getTeamsById);

app.get("/api/teams/:team_id/players", getPlayersByTeamId);

module.exports = { app };
