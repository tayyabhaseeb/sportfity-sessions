const express = require("express");
const app = express();
const {
  getPlayers,
  getSpecificPlayer,
} = require("./controllers/playersController");
const { getLeagues } = require("./controllers/leaguesController");
const { getTeams } = require("./controllers/teamsController");
const {
  getAllManagers,
  addManager,
  updateManager,
} = require("./controllers/managersController");
const { getOrganiser } = require("./controllers/organisersController");

app.use(express.json());

//players
app.get("/api/players", getPlayers);

const { getMatches, getMatchById } = require("./controllers/matchesController");

// const { getMatches } = require("./controllers/matchesController");
const { getTeamsById } = require("./controllers/teamsController");

app.get("/api/players", getPlayers);

app.get("/api/players/:player_id", getSpecificPlayer);

//managers
app.get("/api/managers", getAllManagers);
app.post("/api/managers", addManager);
app.patch("/api/managers/:manager_id", updateManager);

//teams
app.get("/api/teams", getTeams);

//leagues
app.get("/api/leagues", getLeagues);

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

module.exports = { app };
