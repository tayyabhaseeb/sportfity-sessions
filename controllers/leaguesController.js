const { fetchLeagues, fetchLeagueById } = require("../models/leaguesModel");

exports.getLeagues = (req, res) => {
  fetchLeagues().then((leagues) => {
    res.status(200).send({ leagues });
  });
};

exports.getLeagueById = (req, res, next) => {
  const { league_id } = req.params;
  fetchLeagueById(league_id)
    .then((league) => {
      res.status(200).send({ league });
    })
    .catch(next);
};
