const { fetchManagers, postManager } = require("../models/managersModel");

exports.getAllManagers = (req, res) => {
  fetchManagers().then((managers) => {
    res.status(200).send(managers);
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
