const db = require("../src/db/connection");

exports.fetchMatches = () => {
  return db
    .query(`SELECT * FROM matches;`)
    .then(({ rows }) => {
      return rows;
    })
    .catch((err) => console.log(err));
};

exports.fetchMatchById = (matchId) => {
  return db
    .query(`SELECT * FROM matches WHERE match_id = $1;`, [matchId])
    .then(({ rows }) => {
      return rows[0];
    })
    .catch((err) => console.log(err));
};
