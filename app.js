const express = require("express");
const app = express();
const {
  getPlayers,
  getSpecificPlayer,

  getPlayersByTeamId,
} = require("./controllers/playersController");

const { getLeagues } = require("./controllers/leaguesController");
const {
  addNewPlayer,
  updateSpecificPlayer,
} = require("./controllers/playersController");
const {
  getLeagues,
  getLeagueById,
} = require("./controllers/leaguesController");

const { getTeams } = require("./controllers/teamsController");
const {
  getAllManagers,
  addManager,
} = require("./controllers/managersController");
const { getOrganiser } = require("./controllers/organisersController");

const { getMatches, getMatchById } = require("./controllers/matchesController");
const { getTeamsById } = require("./controllers/teamsController");

app.use(express.json());

//players
app.get("/api/players", getPlayers);

const { getMatches, getMatchById } = require("./controllers/matchesController");

const { getTeamsById } = require("./controllers/teamsController");

app.use(express.json());

app.get("/api/players", getPlayers);

app.get("/api/players/:player_id", getSpecificPlayer);
app.post("/api/players", addNewPlayer);
app.patch("/api/players/:player_id", updateSpecificPlayer);

//managers
app.get("/api/managers", getAllManagers);
app.post("/api/managers", addManager);

//teams
app.get("/api/teams", getTeams);

//leagues
app.get("/api/leagues", getLeagues);
app.get("/api/leagues/:league_id", getLeagueById);

//organisers
app.get("/api/organisers", getOrganiser);

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
});

app.use((err, req, res, next) => {
  if (err.code === "22P02" || err.code === "23502") {
    res.status(400).send({ msg: "Bad Request" });
  } else next(err);
});

app.use((err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
});
app.get("/api/matches", getMatches);

app.get("/api/matches/:match_id", getMatchById);

app.get("/api/teams/:team_id", getTeamsById);

app.get("/api/teams/:team_id/players", getPlayersByTeamId);

module.exports = { app };
