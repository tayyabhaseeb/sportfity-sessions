const {
  fetchManagers,
  fetchManagerById,
  postManager,
  patchManager,
  fetchManagersByTeamId,
} = require("../models/managersModel");

exports.getAllManagers = (req, res, next) => {
  fetchManagers()
    .then((managers) => {
      res.status(200).send({ managers });
    })
    .catch(next);
};

exports.getManagerById = (req, res, next) => {
  const { manager_id } = req.params;
  fetchManagerById(manager_id)
    .then((manager) => {
      res.status(200).send({ manager });
    })
    .catch(next);
};

exports.addManager = (req, res, next) => {
  const manager = req.body;
  postManager(manager)
    .then((manager) => {
      res.status(201).send({ manager });
    })
    .catch(next);
};

exports.updateManager = (req, res, next) => {
  const { manager_id } = req.params;
  const { manager_name, email, preferred_game_style } = req.body;

  patchManager(manager_id, manager_name, email, preferred_game_style)
    .then((manager) => {
      res.status(200).send({ manager });
    })
    .catch(next);
};

exports.getManagersByTeamId = (req, res, next) => {
  const { team_id } = req.params;
  fetchManagersByTeamId(team_id)
    .then((managers) => {
      res.status(200).send(managers);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};
