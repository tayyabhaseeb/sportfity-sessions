const db = require("../src/db/connection");

exports.fetchLeagues = () => {
  return db.query("SELECT * FROM leagues").then(({ rows }) => rows);
};

exports.fetchLeagueById = (league_id) => {
  return db
    .query("SELECT * FROM leagues WHERE league_id = $1", [league_id])
    .then(({ rows }) => {
      return rows;
    });
};
