const db = require("../src/db/connection");
exports.fetchOrganiser = () => {
  return db
    .query(`SELECT * FROM organisers;`)
    .then(({ rows }) => {
      return rows;
    })
    .catch((err) => console.log(err));
};
