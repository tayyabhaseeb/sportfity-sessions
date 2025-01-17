const {
  fetchMatches,
  fetchMatchById,
  fetchMatchStatsByMatchId,
  fetchPlayerGoalsByMatchId,
  addMatch,
  changeMatchDetails,
  addMatchPlayer,
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

exports.patchMatch = (req, res, next) => {
  const { match_id } = req.params;
  const { match_date, start_time, duration, league_id } = req.body;
  changeMatchDetails(match_date, start_time, duration, league_id, match_id)
    .then((match) => {
      res.status(200).send({ match });
    })
    .catch((err) => {
      next(err);
    });
};

exports.addMatchPlayer = (req, res, next) => {
  const { match_id } = req.params;
  const { player_id, goals, assists } = req.body;

  addMatchPlayer(match_id, player_id, goals, assists)
    .then((matchPlayer) => {
      res.status(201).send({ matchPlayer });
    })
    .catch(next);
};
