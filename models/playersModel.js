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

module.exports = { fetchPlayers, fetchSpecificPlayer };
