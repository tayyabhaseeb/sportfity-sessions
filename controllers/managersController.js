const { fetchManagers } = require("../models/managersModel");

exports.getAllManagers = (req, res) => {
  fetchManagers().then((managers) => {
    res.status(200).send(managers);
  });
};
