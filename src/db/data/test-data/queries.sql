\c sports_app

-- /api/components/match/:match_id

SELECT matches.match_id, match_date, start_time, duration, team_name, league_name, score
FROM matches
INNER JOIN leagues
ON matches.league_id = leagues.league_id
INNER JOIN match_teams
ON matches.match_id = match_teams.match_id
INNER JOIN teams
ON match_teams.team_id = teams.team_id
WHERE matches.match_id = 2;

-- /api/match/goals/:match_id

SELECT matches.match_id, player_name, goals, team_name
FROM matches
INNER JOIN match_players
ON matches.match_id = match_players.match_id
INNER JOIN players
ON match_players.player_id = players.player_id
INNER JOIN team_players
ON players.player_id = team_players.player_id
INNER JOIN teams
ON team_players.team_id = teams.team_id
WHERE matches.match_id = 2;

-- /api/components/line_up/matches/:match_id

SELECT matches.match_id, team_name, player_name
FROM matches
INNER JOIN match_teams
ON matches.match_id = match_teams.match_id
INNER JOIN teams
ON match_teams.team_id = teams.team_id
INNER JOIN team_players
ON teams.team_id = team_players.team_id
INNER JOIN players
ON team_players.player_id = players.player_id
WHERE matches.match_id = 2;

SELECT teams.team_id, player_name
FROM teams
INNER JOIN team_players
ON teams.team_id = team_players.team_id
INNER JOIN players
ON team_players.player_id = players.player_id
WHERE teams.team_id = 1;

SELECT leagues.league_id, league_name, team_name
      FROM leagues
      INNER JOIN leagues_team
      ON leagues.league_id = leagues_team.league_id
      INNER JOIN teams
      ON leagues_team.team_id = teams.team_id
      WHERE leagues.league_id = 1;
