const db = require("../src/db/connection");

function fetchManagers() {
  return db.query(`SELECT * FROM managers`).then(({ rows }) => {
    return rows;
  });
}

module.exports = { fetchManagers };
