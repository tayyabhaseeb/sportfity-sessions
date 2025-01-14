const db = require("./connection.js");

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
      return joinLeagueAndManager();
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
    });
};

const createOrganisers = () => {
  return db.query(`
        create table organisers(
        organiser_id SERIAL PRIMARY KEY,
        organiser_name VARCHAR (250) not NULL,
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
        preferred_playing_style VARCHAR(250),
        preferred_formation VARCHAR(250)
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

const joinLeagueAndManager = () => {
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
    wins INT DEFAULT 0 ,
    losses INT DEFAULT 0,
    league_position INT,
    points INT,
    manager_id INT REFERENCES managers(manager_id)
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
    duration VARCHAR(250),
    team_one_id INT references teams(team_id),
    team_two_id INT references teams(team_id),
  	team_one_score INT,
    team_two_score INT
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
        preferred_playing_style VARCHAR(250),
        goals INT DEFAULT 0,
        assists INT DEFAULT 0
        );
        `);
};

const joinMatchPlayers = () => {
  return db.query(`
        CREATE TABLE match_players(
        match_players_id SERIAL PRIMARY  KEY,
        match_id INT REFERENCES matches(match_id),
        player_id INT REFERENCES players(player_id),
        goals INT DEFAULT 0,
        assists INT DEFAULT 0
  );`);
};

const joinMatchTeam = () => {
  return db.query(`
        CREATE TABLE match_teams(
        match_teams_id SERIAL PRIMARY  KEY,
        match_id INT REFERENCES matches(match_id),
        team_id INT REFERENCES teams(team_id)
        );
        `);
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

module.exports = seed;
