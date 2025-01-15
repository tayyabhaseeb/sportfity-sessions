const { getPlayers } = require("../controllers/playersController");

const playersRouter = require("express").Router();

playersRouter.route("/").get(getPlayers);

module.exports = playersRouter;
