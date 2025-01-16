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

function postNewPlayer(name, email, position, style, date_joined) {
  return db
    .query(
      `INSERT INTO players(player_name, player_email,preferred_position, preferred_game_style, date_joined)
    VALUES($1,$2,$3,$4,$5)
    RETURNING *
    `,
      [name, email, position, style, date_joined]
    )
    .then(({ rows }) => {
      return rows[0];
    });
}

module.exports = { fetchPlayers, fetchSpecificPlayer, postNewPlayer };
