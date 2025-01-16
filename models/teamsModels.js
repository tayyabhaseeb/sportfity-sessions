const db = require("../src/db/connection");

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

module.exports = { fetchTeams, fetchTeamsById, fetchTeamsByLeagueId };

