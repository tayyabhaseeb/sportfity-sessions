const db = require("../src/db/connection");

function fetchTeams() {
  return db.query(`SELECT * FROM teams`).then(({ rows }) => {
    return rows;
  });
}

module.exports = { fetchTeams };
