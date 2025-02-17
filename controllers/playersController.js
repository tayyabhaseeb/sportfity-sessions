const {
  fetchPlayers,
  fetchSpecificPlayer,
  postNewPlayer,
  fetchUpdatedPlayer,
  fetchPlayersByTeamId,
  deletePlayerModel,
} = require("../models/playersModel");

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
exports.addNewPlayer = (req, res, next) => {
  const {
    player_name,
    player_email,
    preferred_position,
    preferred_game_style,
    date_joined,
  } = req.body;

  postNewPlayer(
    player_name,
    player_email,
    preferred_position,
    preferred_game_style,
    date_joined
  )
    .then((player) => {
      res.status(201).send({ player });
    })
    .catch((err) => {
      next(err);
      console.log(err);
    });
};

exports.updateSpecificPlayer = (req, res, next) => {
  const { player_id } = req.params;
  const {
    player_name,
    player_email,
    preferred_position,
    preferred_game_style,
  } = req.body;

  fetchUpdatedPlayer(
    player_id,
    player_name,
    player_email,
    preferred_position,
    preferred_game_style
  )
    .then((player) => {
      res.status(200).send({ player });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteSpecificPlayer = (req, res, next) => {
  const { player_id } = req.params;

  deletePlayerModel(player_id).then(() => {
    res.status(204).send();
  });
};
