const { fetchTeams } = require("../models/teamsModels");

exports.getTeams = (req, res) => {
  fetchTeams().then((teams) => {
    res.status(200).send(teams);
  });
};
