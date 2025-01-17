const { error } = require("console");
const db = require("../src/db/connection");
const format = require("pg-format");

function fetchTeams() {
  return db.query(`SELECT * FROM teams;`).then(({ rows }) => {
    return rows;
  });
}

function fetchTeamsById(team_id) {
  return db
    .query(`SELECT * FROM teams where team_id = $1;`, [team_id])
    .then(({ rows }) => {
      return rows;
    });
}

function fetchTeamsByLeagueId(league_id) {
  return db
    .query(
      `SELECT leagues.league_id, league_name, team_name
      FROM leagues
      INNER JOIN leagues_team
      ON leagues.league_id = leagues_team.league_id
      INNER JOIN teams
      ON leagues_team.team_id = teams.team_id
      WHERE leagues.league_id = $1;`,
      [league_id]
    )
    .then(({ rows }) => {
      return rows;
    });
}

function insertTeamPlayers(team_id, player_id) {
  const insertTeamPlayersQueryStr = format(
    "INSERT INTO team_players (team_id, player_id) VALUES (%L) RETURNING *",
    [team_id, player_id]
  );
  return db.query(insertTeamPlayersQueryStr).then(({ rows }) => {
    return rows;
  });
}

function removeTeamById(team_id) {
  const removeTeamByIdQueryStr = format(
    "DELETE FROM teams WHERE team_id = %L RETURNING *",
    [team_id]
  );
  return db.query(removeTeamByIdQueryStr).then(({ rows }) => {
    return rows;
  });
}

function removeTeamLeagueById(team_id) {
  const removeTeamLeagueById = format(
    "DELETE FROM leagues_team WHERE team_id = %L RETURNING *",
    [team_id]
  );
  return db.query(removeTeamLeagueById).then(({ rows }) => {
    if (!rows.length) {
      return Promise.reject({ status: 404, msg: "Not found" });
    }
  });
}

function removeTeamPlayerByTeamId(team_id) {
  const removeTeamPlayerByTeamIdQueryStr = format(
    "DELETE FROM team_players WHERE team_id = %L RETURNING *",
    [team_id]
  );
  return db.query(removeTeamPlayerByTeamIdQueryStr).then(({ rows }) => {
    if (!rows.length) {
      return Promise.reject({ status: 404, msg: "Not found" });
    }
  });
}

module.exports = {
  fetchTeams,
  fetchTeamsById,
  fetchTeamsByLeagueId,
  insertTeamPlayers,
  removeTeamById,
  removeTeamLeagueById,
  removeTeamPlayerByTeamId,
};
