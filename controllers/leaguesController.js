const { fetchLeagues } = require("../models/leaguesModel");

exports.getLeagues = (req, res) => {
  fetchLeagues().then((leagues) => {
    res.status(200).send(leagues);
  });
};
