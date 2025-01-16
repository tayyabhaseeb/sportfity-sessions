const { fetchTeams, fetchTeamsById } = require("../models/teamsModels");

exports.getTeams = (req, res) => {
  fetchTeams().then((teams) => {
    res.status(200).send(teams);
  });
};

exports.getTeamsById = (req, res) => {
  const { team_id } = req.params;
  fetchTeamsById(team_id).then((teams) => {
    res.status(200).send(teams);
  });
};
