const db = require("../src/db/connection");

function fetchLeagues() {
  return db.query("SELECT * FROM leagues").then(({ rows }) => rows);
}

module.exports = { fetchLeagues };
