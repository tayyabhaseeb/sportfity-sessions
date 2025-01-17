const { removeManagerTeamByTeamId } = require("../models/managersModel");
const { removeMatchTeamsByTeamID } = require("../models/matchesModel");
const {
  fetchTeams,
  fetchTeamsById,
  fetchTeamsByLeagueId,
  insertTeamPlayers,
  removeTeamById,
  removeTeamLeagueById,
  removeTeamPlayerByTeamId,
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

exports.postTeamPlayers = (req, res, next) => {
  const { team_id, player_id } = req.body;
  insertTeamPlayers(team_id, player_id)
    .then((team_players) => {
      res.status(200).send({ team_players });
    })
    .catch(next);
};

exports.deleteTeamById = (req, res, next) => {
  const { team_id } = req.params;
  const promises = [
    removeTeamById(team_id),
    removeTeamLeagueById(team_id),
    removeTeamPlayerByTeamId(team_id),
    removeManagerTeamByTeamId(team_id),
    removeMatchTeamsByTeamID(team_id),
  ];

  return Promise.all(promises)
    .then(([team]) => {
      res.status(202).send({ team });
    })
    .catch(next);
};
