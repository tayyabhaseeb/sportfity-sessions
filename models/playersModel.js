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

function fetchUpdatedPlayer(id, name, email, position, style) {
  return db
    .query(
      `UPDATE players SET player_name = $1 , player_email = $2 , preferred_position = $3 , preferred_game_style = $4 WHERE player_id = $5
       RETURNING *
      `,
      [name, email, position, style, id]
    )
    .then(({ rows }) => {
      return rows[0];
    });
}

module.exports = {
  fetchPlayers,
  fetchSpecificPlayer,
  postNewPlayer,
  fetchUpdatedPlayer,
};
