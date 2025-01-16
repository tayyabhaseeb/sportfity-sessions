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
module.exports = { fetchTeams, fetchTeamsById };
