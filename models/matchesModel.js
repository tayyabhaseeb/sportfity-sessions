const db = require("../src/db/connection");
const format = require("pg-format");

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

exports.fetchMatchStatsByMatchId = (match_id) => {
  return db
    .query(
      `SELECT matches.match_id, match_date, start_time, duration, team_name, league_name, score
        FROM matches
        INNER JOIN leagues
        ON matches.league_id = leagues.league_id
        INNER JOIN match_teams
        ON matches.match_id = match_teams.match_id
        INNER JOIN teams
        ON match_teams.team_id = teams.team_id
        WHERE matches.match_id = $1;`,
      [match_id]
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.fetchPlayerGoalsByMatchId = (match_id) => {
  return db
    .query(
      `SELECT matches.match_id, player_name, goals, team_name
        FROM matches
        INNER JOIN match_players
        ON matches.match_id = match_players.match_id
        INNER JOIN players
        ON match_players.player_id = players.player_id
        INNER JOIN team_players
        ON players.player_id = team_players.player_id
        INNER JOIN teams
        ON team_players.team_id = teams.team_id
        WHERE matches.match_id = $1;`,
      [match_id]
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.addMatch = (match_date, start_time, duration, league_id) => {
  return db
    .query(
      `INSERT INTO matches(match_date, start_time, duration, league_id) VALUES($1,$2,$3,$4) RETURNING *;`,
      [match_date, start_time, duration, league_id]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.changeMatchDetails = (
  match_date,
  start_time,
  duration,
  league_id,
  match_id
) => {
  return db
    .query(
      `UPDATE matches SET match_date = $1 , start_time = $2, duration = $3, league_id = $4 WHERE match_id = $5 RETURNING *;`,
      [match_date, start_time, duration, league_id, match_id]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};
exports.addMatchPlayer = (match_id, player_id, goals, assists) => {
  return db
    .query(
      `INSERT INTO match_players (match_id, player_id, goals, assists) VALUES ($1, $2, $3, $4) RETURNING *;`,
      [match_id, player_id, goals, assists]
    )
    .then(({ rows }) => rows[0]);
};

exports.removeMatchTeamsByTeamID = (team_id) => {
  const removeMatchTeamsByTeamIDQueryStr = format(
    `DELETE FROM match_teams WHERE team_id = %L RETURNING *`,
    [team_id]
  );
  return db.query(removeMatchTeamsByTeamIDQueryStr).then(({ rows }) => {
    if (!rows.length) {
      return Promise.reject({ status: 404, msg: "Not found" });
    }
  });
};
