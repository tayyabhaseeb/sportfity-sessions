const {
  fetchMatches,
  fetchMatchById,
  fetchMatchStatsByMatchId,
  fetchPlayerGoalsByMatchId,
} = require("../models/matchesModel");

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

exports.getMatchStatsByMatchId = (req, res, next) => {
  const { match_id } = req.params;
  fetchMatchStatsByMatchId(match_id)
    .then((matchStats) => {
      res.status(200).send({ matchStats });
    })
    .catch(next);
};

exports.getPlayerGoalsByMatchId = (req, res, next) => {
  const { match_id } = req.params;
  fetchPlayerGoalsByMatchId(match_id)
    .then((playerGoals) => {
      res.status(200).send({ playerGoals });
    })
    .catch(next);
};
