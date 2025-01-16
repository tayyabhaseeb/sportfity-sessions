const { fetchPlayers, fetchSpecificPlayer } = require("../models/playersModel");
const { fetchPlayersByTeamId } = require("../models/playersModel");

exports.getPlayers = (req, res) => {
  fetchPlayers().then((players) => {
    res.status(200).send(players);
  });
};

exports.getSpecificPlayer = (req, res, next) => {
  const { player_id } = req.params;
  fetchSpecificPlayer(player_id)
    .then((player) => {
      res.status(200).send({ player });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getPlayersByTeamId = (req, res) => {
  const { team_id } = req.params;
  fetchPlayersByTeamId(team_id).then((players) => {
    res.status(200).send(players);
  });
};
