const express = require("express");
const app = express();
const { getPlayers } = require("./controllers/playersController");
const { getLeagues } = require("./controllers/leaguesController");
const { getTeams } = require("./controllers/teamsController");
const {
  getAllManagers,
  addManager,
} = require("./controllers/managersController");
const { getOrganiser } = require("./controllers/organisersController");

app.use(express.json());

//players
app.get("/api/players", getPlayers);

//managers
app.get("/api/managers", getAllManagers);
app.post("/api/managers", addManager);

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

module.exports = { app };
