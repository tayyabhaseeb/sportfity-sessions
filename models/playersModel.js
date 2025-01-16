const db = require("../src/db/connection");

function fetchPlayers() {
  return db.query(`SELECT * FROM players`).then(({ rows }) => {
    return rows;
  });
}

function fetchSpecificPlayer(id) {
  return db
    .query("SELECT * FROM players WHERE player_id = $1", [id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "not found " });
      }
      return rows;
    });
}

function fetchPlayersByTeamId(team_id) {
  return db
    .query(
      `SELECT teams.team_id, player_name
FROM teams
INNER JOIN team_players
ON teams.team_id = team_players.team_id
INNER JOIN players
ON team_players.player_id = players.player_id WHERE teams.team_id = $1;`,
      [team_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "not found " });
      }
      return rows;
    });
}

module.exports = { fetchPlayers, fetchSpecificPlayer, fetchPlayersByTeamId };
