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
      `INSERT INTO match_players (player_id, match_id, goals, assists) VALUES ($1, $2, $3, $4) RETURNING *;`,
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

exports.removeMatch = (match_id) => {
  return db
    .query(`DELETE FROM matches WHERE match_id = $1 RETURNING *;`, [match_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "not found 1 " });
      }
      return rows;
    });
};

exports.removeMatchTeams = (match_id) => {
  return db
    .query(`DELETE FROM match_teams WHERE match_id = $1 RETURNING *;`, [
      match_id,
    ])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "not found 2 " });
      }
    });
};

exports.removeMatchPlayers = (match_id) => {
  return db
    .query(`DELETE FROM match_players WHERE match_id = $1 RETURNING *;`, [
      match_id,
    ])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "not found 3 " });
      }
    });
};

exports.fetchLineUpByMatchId = (match_id) => {
  const fetchLineUpByMatchIdQueryStr = format(
    `SELECT matches.match_id, team_name, player_name
        FROM matches
        INNER JOIN match_teams
        ON matches.match_id = match_teams.match_id
        INNER JOIN teams
        ON match_teams.team_id = teams.team_id
        INNER JOIN team_players
        ON teams.team_id = team_players.team_id
        INNER JOIN players
        ON team_players.player_id = players.player_id
        WHERE matches.match_id = %L;`,
    [match_id]
  );

  return db.query(fetchLineUpByMatchIdQueryStr).then(({ rows }) => {
    return rows;
  });
};

exports.fetchMatchTeamsByMatchId = (match_id) => {
  const fetchMatchTeamsByMatchIdQueryStr = format(
    "SELECT * FROM match_teams WHERE match_id = %L",
    [match_id]
  );

  return db.query(fetchMatchTeamsByMatchIdQueryStr).then(({ rows }) => {
    return rows;
  });
};

exports.insertMatchTeams = (match_id, team_id) => {
  const insertMatchTeamsQueryStr = format(
    `INSERT INTO match_teams (match_id, team_id) VALUES (%L) RETURNING *`,
    [match_id, team_id]
  );

  return db.query(insertMatchTeamsQueryStr).then(({ rows }) => {
    return rows;
  });
};

exports.updateMatchTeamsByMatchId = (match_id, team_id, score) => {
  const updateMatchTeamByMatchIdQueryStr = format(
    `UPDATE match_teams SET score = data.score 
    FROM (VALUES (CAST(%L AS INTEGER), CAST(%L AS INTEGER), CAST(%L AS INTEGER)))
    AS data(match_id, team_id, score) 
    WHERE match_teams.match_id = data.match_id AND match_teams.team_id = data.team_id RETURNING *;`,
    match_id,
    team_id,
    score
  );

  return db.query(updateMatchTeamByMatchIdQueryStr).then(({ rows }) => {
    return rows;
  });
};
