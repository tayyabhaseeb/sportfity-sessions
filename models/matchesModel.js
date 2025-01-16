const db = require("../src/db/connection");

exports.fetchMatches = () => {
  return db
    .query(`SELECT * FROM matches;`)
    .then(({ rows }) => {
      return rows;
    })
    .catch((err) => console.log(err));
};
