const { fetchTeams, fetchTeamsById } = require("../models/teamsModels");

exports.getTeams = (req, res) => {
  fetchTeams()
    .then((teams) => {
      res.status(200).send(teams);
    })
    .catch(next);
};

exports.getTeamsById = (req, res) => {
  fetchTeamsById(team_id)
    .then((teams) => {
      res.status(200).send(teams);
    })
    .catch(next);
};
