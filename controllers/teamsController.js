const {
  fetchTeams,
  fetchTeamsById,
  fetchTeamsByLeagueId,
} = require("../models/teamsModels");

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

exports.getTeamsByLeagueId = (req, res, next) => {
  const { league_id } = req.params;
  fetchTeamsByLeagueId(league_id)
    .then((teams) => {
      res.status(200).send({ teams });
    })
    .catch(next);
};
