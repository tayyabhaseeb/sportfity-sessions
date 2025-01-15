const db = require("./connection.js");
const format = require("pg-format");
const { leagues, players, match_team } = require("./data/test-data/index.js");
const organisers = require("./data/test-data/organisers.js");
const teams = require("./data/test-data/teams.js");
const matches = require("./data/test-data/matches.js");
const managers = require("./data/test-data/managers.js");
const managers_leagues = require("./data/test-data/managers_leagues.js");
const match_player = require("./data/test-data/match_player.js");
const team_league = require("./data/test-data/team_league.js");
const team_players = require("./data/test-data/team_players.js");

const seed = () => {
  return db
    .query(`DROP TABLE IF EXISTS team_players;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS match_teams;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS match_players;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS players;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS matches;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS league_teams;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS teams;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS league_manager;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS leagues;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS managers;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS organisers;`);
    })
    .then(() => {
      return createOrganisers();
    })
    .then(() => {
      return createManagers();
    })
    .then(() => {
      return createLeagues();
    })
    .then(() => {
      return joinLeagueManager();
    })
    .then(() => {
      return createTeams();
    })
    .then(() => {
      return joinLeagueTeams();
    })
    .then(() => {
      return createMatches();
    })
    .then(() => {
      return createPlayers();
    })
    .then(() => {
      return joinMatchPlayers();
    })
    .then(() => {
      return joinMatchTeam();
    })
    .then(() => {
      return joinTeamPlayers();
    })
    .then(() => {
      return insertOrganiser();
    })
    .then(() => {
      return insertLeague();
    })
    .then(() => {
      return insertManager();
    })
    .then(() => {
      return insertPlayers();
    })
    .then(() => {
      return insertTeam();
    })
    .then(() => {
      return insertMatch();
    })
    .then(() => {
      return insertManagerLeague();
    })
    .then(() => {
      return insertMatchPlayer();
    })
    .then(() => {
      return insertMatchTeam();
    })
    .then(() => {
      return insertLeaguesTeam();
    })
    .then(() => {
      return insertTeamPlayers();
    });
};

const createOrganisers = () => {
  return db.query(`
        create table organisers(
        organiser_id SERIAL PRIMARY KEY,
        organiser_name VARCHAR (250) NOT NULL,
        email VARCHAR(250) NOT NULL,
        date_joined VARCHAR(250) NOT NULL
        );`);
};

const createManagers = () => {
  return db.query(`
        CREATE TABLE managers(
        manager_id SERIAL PRIMARY KEY,
        manager_name VARCHAR (250) NOT NULL,
        email VARCHAR (250) NOT NULL,
        date_joined VARCHAR(250) NOT NULL,
        preferred_game_style VARCHAR(250)
    );`);
};

const createLeagues = () => {
  return db.query(`
    CREATE TABLE leagues(
    league_id SERIAL PRIMARY KEY,
    league_name VARCHAR (250) NOT NULL,
	start_date VARCHAR(250) NOT NULL,
 	end_date VARCHAR(250) NOT NULL,
    organiser_id INT REFERENCES organisers(organiser_id)
    
      );`);
};

const joinLeagueManager = () => {
  return db.query(`
    CREATE TABLE league_manager(
    league_manager SERIAL PRIMARY KEY,
    league_id INT REFERENCES leagues(league_id),
    manager_id INT REFERENCES managers(manager_id)
     );
    `);
};
const createTeams = () => {
  return db.query(`
    CREATE TABLE teams(
    team_id SERIAL PRIMARY KEY,
    team_name VARCHAR (250) NOT NULL,
    league_id INT,
    manager_id INT REFERENCES managers(manager_id),
    wins INT DEFAULT 0 ,
    losses INT DEFAULT 0,
    draws INT DEFAULT 0,
    league_position INT,
    points INT
  );
  `);
};
const joinLeagueTeams = () => {
  return db.query(`
    CREATE TABLE leagues_team(
    leagues_teams SERIAL PRIMARY KEY,
    team_id INT REFERENCES teams(team_id),
    league_id INT REFERENCES leagues(league_id)
  );`);
};

const createMatches = () => {
  return db.query(`
        CREATE TABLE matches(
  match_id SERIAL PRIMARY KEY,
    match_date VARCHAR(250),
    start_time VARCHAR(250),
    duration INT,
    league_id INT
  );
    `);
};

const createPlayers = () => {
  return db.query(`
        CREATE table players(
        player_id SERIAL PRIMARY KEY,
        player_name VARCHAR(250) NOT NULL,
        player_email VARCHAR(250) NOT NULL,
        date_joined VARCHAR(250) NOT NULL,
        preferred_position VARCHAR(250),
        preferred_game_style VARCHAR(250)
        );
        `);
};

const joinMatchPlayers = () => {
  return db.query(`
        CREATE TABLE match_players(
        match_players_id SERIAL PRIMARY  KEY,
        player_id INT REFERENCES players(player_id),
        match_id INT REFERENCES matches(match_id),
        goals INT DEFAULT 0,
        assists INT DEFAULT 0
  );`);
};

const joinMatchTeam = () => {
  return db.query(`
        CREATE TABLE match_teams(
        match_teams_id SERIAL PRIMARY  KEY,
        match_id INT REFERENCES matches(match_id),
        team_id INT REFERENCES teams(team_id),
        score INT
        );
        `);
};

const joinTeamLeague = () => {
  return db.query(`CREATE TABLE team_leagues(
                  team_leagues_id SERIAL PRIMARY KEY,
                  team_id INT NOT NULL,
                  league_id INT NOT NULL
                  );`);
};

const joinTeamPlayers = () => {
  return db.query(`
        CREATE TABLE team_players(
        team_players SERIAL PRIMARY KEY,
        team_id INT REFERENCES teams(team_id),
        player_id INT REFERENCES players(player_id)
        );
        `);
};

const insertLeague = () => {
  const insertLeagueQueryStr = format(
    "INSERT INTO leagues (league_name, start_date, end_date, organiser_id) VALUES %L;",
    leagues.map(({ league_name, start_date, end_date, organiser_id }) => {
      return [
        league_name,
        new Date(start_date),
        new Date(end_date),
        organiser_id,
      ];
    })
  );

  return db.query(insertLeagueQueryStr);
};

const insertOrganiser = () => {
  const insertOrganiserQueryStr = format(
    "INSERT INTO organisers (organiser_name, date_joined, email) VALUES %L",
    organisers.map(({ organiser_name, date_joined, email }) => {
      return [organiser_name, new Date(date_joined), email];
    })
  );

  return db.query(insertOrganiserQueryStr);
};

const insertManager = () => {
  const insertManagerQueryStr = format(
    "INSERT INTO managers (manager_name, email, date_joined, preferred_game_style) VALUES %L",
    managers.map(
      ({ manager_name, email, date_joined, preferred_game_style }) => {
        return [
          manager_name,
          email,
          new Date(date_joined),
          preferred_game_style,
        ];
      }
    )
  );

  return db.query(insertManagerQueryStr);
};

const insertPlayers = () => {
  const insertPlayerQueryStr = format(
    "INSERT INTO players (player_name, player_email, date_joined, preferred_game_style, preferred_position) VALUES %L",
    players.map(
      ({
        player_name,
        player_email,
        date_joined,
        preferred_game_style,
        preferred_position,
      }) => {
        return [
          player_name,
          player_email,
          new Date(date_joined),
          preferred_game_style,
          preferred_position,
        ];
      }
    )
  );
  db.query(insertPlayerQueryStr);
};

const insertTeam = () => {
  const insertTeamQueryStr = format(
    "INSERT INTO teams (team_name, league_id, manager_id, wins, losses, draws, league_position, points) VALUES %L",
    teams.map(
      ({
        team_name,
        league_id,
        manager_id,
        wins,
        losses,
        draws,
        league_position,
        points,
      }) => {
        return [
          team_name,
          league_id,
          manager_id,
          wins,
          losses,
          draws,
          league_position,
          points,
        ];
      }
    )
  );

  return db.query(insertTeamQueryStr);
};

const insertMatch = () => {
  const insertMatchQueryStr = format(
    "INSERT INTO matches (match_date, start_time, duration, league_id) VALUES %L",
    matches.map(({ match_date, start_time, duration, league_id }) => {
      return [new Date(match_date), start_time, duration, league_id];
    })
  );
  return db.query(insertMatchQueryStr);
};

const insertManagerLeague = () => {
  const insertManagerLeagueQueryStr = format(
    "INSERT INTO league_manager (league_id, manager_id) VALUES %L",
    managers_leagues.map(({ league_id, manager_id }) => {
      return [league_id, manager_id];
    })
  );
  return db.query(insertManagerLeagueQueryStr);
};

const insertMatchPlayer = () => {
  const insertMatchPlayerQueryStr = format(
    "INSERT INTO match_players (player_id, match_id, goals, assists) VALUES %L",
    match_player.map(({ player_id, match_id, goals, assists }) => {
      return [player_id, match_id, goals, assists];
    })
  );
  return db.query(insertMatchPlayerQueryStr);
};

const insertMatchTeam = () => {
  const insertMatchTeamQueryStr = format(
    "INSERT INTO match_teams (match_id, team_id, score) VALUES %L",
    match_team.map(({ match_id, team_id, score }) => {
      return [match_id, team_id, score];
    })
  );

  return db.query(insertMatchTeamQueryStr);
};

const insertLeaguesTeam = () => {
  const insertTeamLeagueQueryStr = format(
    "INSERT INTO leagues_team (team_id, league_id) VALUES %L",
    team_league.map(({ team_id, league_id }) => {
      return [team_id, league_id];
    })
  );
  return db.query(insertTeamLeagueQueryStr);
};

const insertTeamPlayers = () => {
  const insertTeamPlayersQueryStr = format(
    "INSERT INTO team_players (team_id, player_id) VALUES %L",
    team_players.map(({ team_id, player_id }) => {
      return [team_id, player_id];
    })
  );
  return db.query(insertTeamPlayersQueryStr);
};

module.exports = seed;
