const db = require("../src/db/connection");
exports.fetchManagers = () => {
  return db.query(`SELECT * FROM managers;`).then(({ rows }) => {
    return rows;
  });
};

exports.fetchManagerById = (manager_id) => {
  return db
    .query(`SELECT * FROM managers WHERE manager_id = $1;`, [manager_id])
    .then(({ rows }) => {
      if (!rows[0]) {
        return Promise.reject({
          status: 404,
          msg: `Manager with ID of ${manager_id} was not found.`,
        });
      }
      return rows[0];
    });
};

exports.postManager = (manager) => {
  const { manager_name, email, date_joined, preferred_game_style } = manager;
  if (!manager_name) {
    return Promise.reject({
      status: 400,
      msg: "Invalid Name",
    });
  }
  if (!email) {
    return Promise.reject({
      status: 400,
      msg: "Invalid Email",
    });
  }
  return db
    .query(
      `INSERT INTO managers (manager_name,email,date_joined,preferred_game_style) 
    VALUES ($1,$2,$3,$4) RETURNING *;`,
      [manager_name, email, date_joined, preferred_game_style]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.patchManager = (
  manager_id,
  manager_name,
  email,
  preferred_game_style
) => {
  return db
    .query(
      `UPDATE managers
      SET manager_name = $1, email = $2, preferred_game_style=$3
       WHERE manager_id = $4 RETURNING *;`,
      [manager_name, email, preferred_game_style, manager_id]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};
