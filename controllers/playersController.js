const { fetchPlayers } = require("../models/playersModel");

exports.getPlayers = (req, res) => {
  fetchPlayers().then((players) => {
    res.status(200).send(players);
  });
};
