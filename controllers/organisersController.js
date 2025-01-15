const { fetchOrganiser } = require("../models/organisersModel");
exports.getOrganiser = (req, res) => {
  fetchOrganiser().then((organisers) => {
    res.status(200).send(organisers);
  });
};
