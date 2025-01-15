const { log } = require("console");
const db = require("../src/db/connection");

function fetchPlayers() {
  return db.query(`SELECT * FROM players`).then(({ rows }) => {
    return rows;
  });
}

module.exports = { fetchPlayers };
