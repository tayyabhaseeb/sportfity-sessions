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
