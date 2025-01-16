const { fetchMatches, fetchMatchById } = require("../models/matchesModel");

exports.getMatches = (req, res) => {
  fetchMatches().then((matches) => {
    res.status(200).send(matches);
  });
};

exports.getMatchById = (req, res) => {
  fetchMatchById(req.params.match_id).then((match) => {
    if (match) {
      res.status(200).send({ match });
    } else {
      res.status(404).send({ message: "Match not found" });
    }
  });
};
