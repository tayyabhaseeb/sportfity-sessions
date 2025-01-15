const express = require("express");
const app = express();
const { getOrganiser } = require("./controllers/organisersController");
const { getPlayers } = require("./controllers/playersController");
const { getLeagues } = require("./controllers/leaguesController");

app.get("/api/players", getPlayers);

app.get("/api/organisers", getOrganiser);

app.get("/api/leagues", getLeagues);

module.exports = { app };
