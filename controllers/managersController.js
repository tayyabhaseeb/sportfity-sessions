const {
  fetchManagers,
  postManager,
  patchManager,
} = require("../models/managersModel");

exports.getAllManagers = (req, res) => {
  fetchManagers().then((managers) => {
    res.status(200).send({ managers });
  });
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
  console.log("hit controller");
  const { manager_id } = req.params;
  const { manager_name, email, preferred_game_style } = req.body;

  patchManager(manager_id, manager_name, email, preferred_game_style)
    .then((body) => {
      res.status(204).send({ body });
      console.log("response retuend");
    })
    .catch(next);
};
