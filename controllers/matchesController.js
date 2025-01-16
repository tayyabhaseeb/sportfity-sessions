const { fetchMatches } = require("../models/matchesModel");

exports.getMatches = (req, res) => {
  fetchMatches().then((matches) => {
    res.status(200).send(matches);
  });
};
