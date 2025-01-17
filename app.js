const express = require("express");
const app = express();
const {
  getPlayers,
  getSpecificPlayer,
  getPlayersByTeamId,
  deleteSpecificPlayer,
  addNewPlayer,
  updateSpecificPlayer,
} = require("./controllers/playersController");

const {
  getLeagues,
  getLeagueById,
} = require("./controllers/leaguesController");

const {
  getTeams,
  getTeamsByLeagueId,
  getTeamsById,
  postTeamPlayers,
} = require("./controllers/teamsController");

const {
  getAllManagers,
  getManagerById,
  addManager,
  updateManager,
} = require("./controllers/managersController");

const {
  getMatches,
  getMatchById,
  getMatchStatsByMatchId,
  getPlayerGoalsByMatchId,
  postMatch,
} = require("./controllers/matchesController");

const { getOrganiser } = require("./controllers/organisersController");

app.use(express.json());

//players
app.get("/api/players", getPlayers);
app.get("/api/players/:player_id", getSpecificPlayer);
app.post("/api/players", addNewPlayer);
app.patch("/api/players/:player_id", updateSpecificPlayer);
app.delete("/api/players/:player_id", deleteSpecificPlayer);

//managers
app.get("/api/managers", getAllManagers);
app.get("/api/managers/:manager_id", getManagerById);
app.post("/api/managers", addManager);
app.patch("/api/managers/:manager_id", updateManager);

//teams
app.get("/api/teams", getTeams);
app.get("/api/leagues/:league_id/teams", getTeamsByLeagueId);
app.get("/api/teams/:team_id", getTeamsById);
app.get("/api/teams/:team_id/players", getPlayersByTeamId);
app.get("/api/teams/:team_id", getTeamsById);
app.get("/api/teams/:team_id/players", getPlayersByTeamId);
app.post("/api/teams/team_players", postTeamPlayers);

//leagues
app.get("/api/leagues", getLeagues);
app.get("/api/leagues/:league_id", getLeagueById);

//matches
app.get("/api/matches", getMatches);
app.get("/api/matches/:match_id", getMatchById);
app.get("/api/matches/:match_id/stats", getMatchStatsByMatchId);
app.get("/api/matches/:match_id/player_goals", getPlayerGoalsByMatchId);
app.post("/api/matches", postMatch);

//organisers
app.get("/api/organisers", getOrganiser);

//organisers
app.get("/api/organisers", getOrganiser);

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
});

app.use((err, req, res, next) => {
  if (err.code === "22P02" || err.code === "23502" || err.code === "42601") {
    res.status(400).send({ msg: "Bad Request" });
  } else next(err);
});

app.use((err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
});

module.exports = { app };
