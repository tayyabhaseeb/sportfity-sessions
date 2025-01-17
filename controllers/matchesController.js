const {
  fetchMatches,
  fetchMatchById,
  fetchMatchStatsByMatchId,
  fetchPlayerGoalsByMatchId,
  addMatch,
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

exports.postMatch = (req, res, next) => {
  const { match_date, start_time, duration, league_id } = req.body;
  addMatch(match_date, start_time, duration, league_id)
    .then((match) => {
      res.status(201).send({ match });
    })
    .catch((err) => {
      next(err);
    });
};
