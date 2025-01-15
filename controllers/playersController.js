const { fetchPlayers } = require("../models/playersModel");

function getPlayers(req, res) {
  fetchPlayers().then((players) => {
    res.status(200).send({ players });
  });
}

module.exports = { getPlayers };
