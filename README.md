
# Sportify Sessions API

Sportify Sessions is a RESTful API built for managing players, teams, managers, leagues, matches, and organisers in a sports tournament management system. This API is ideal for applications that require sports scheduling, team management, and statistical tracking.

---

## 🌐 Live Preview

You can see the live preview of the project here:  
👉 **[Sportify Sessions](https://northcoders.com/project-phase/sportify-sessions)**  
*(Replace with your actual deployed link)*

---

## 📦 Base URL

```
/api
```

---

## 📁 Endpoints

### 🔹 Players

- `GET /players` – Get all players  
- `GET /players/:player_id` – Get a specific player by ID  
- `POST /players` – Add a new player  
- `PATCH /players/:player_id` – Update a specific player  
- `DELETE /players/:player_id` – Delete a specific player  

---

### 🔹 Managers

- `GET /managers` – Get all managers  
- `GET /managers/:manager_id` – Get a specific manager by ID  
- `GET /teams/:team_id/manager` – Get manager of a specific team  
- `POST /managers` – Add a new manager  
- `PATCH /managers/:manager_id` – Update a manager  

---

### 🔹 Teams

- `GET /teams` – Get all teams  
- `GET /leagues/:league_id/teams` – Get teams by league ID  
- `GET /teams/:team_id` – Get a specific team by ID  
- `GET /teams/:team_id/players` – Get players in a team  
- `DELETE /teams/:team_id` – Delete a team  
- `POST /teams/team_players` – Assign players to a team  

---

### 🔹 Leagues

- `GET /leagues` – Get all leagues  
- `GET /leagues/:league_id` – Get a specific league by ID  

---

### 🔹 Matches

- `GET /matches` – Get all matches  
- `GET /matches/:match_id` – Get a specific match by ID  
- `GET /matches/:match_id/stats` – Get stats for a match  
- `GET /matches/:match_id/player_goals` – Get goals scored by players in a match  
- `GET /matches/:match_id/line_up` – Get line-up for a match  
- `GET /matches/:match_id/match_teams` – Get teams in a match  
- `POST /matches` – Add a new match  
- `PATCH /matches/:match_id` – Update match details  
- `DELETE /matches/:match_id` – Delete a match  
- `POST /matches/:match_id/match_players` – Assign players to a match  
- `POST /matches/:match_id/match_teams` – Assign teams to a match  
- `PATCH /matches/:match_id/match_teams` – Update match team data  

---

### 🔹 Organisers

- `GET /organisers` – Get all organisers  

---

## 🧪 Tech Stack

- Node.js  
- Express.js  
- PostgreSQL / MongoDB *(adjust as needed)*  
- Jest / Supertest *(for testing)*

---

## 🚀 Getting Started

1. Clone the repo  
   ```bash
   git clone https://github.com/yourusername/sportify-sessions.git
   cd sportify-sessions
   ```

2. Install dependencies  
   ```bash
   npm install
   ```

3. Set up environment variables (e.g. `.env`)  
   ```bash
   DB_URL=your_database_url
   PORT=your_port
   ```

4. Start the server  
   ```bash
   npm run dev
   ```

---

## 📫 Contributing

Feel free to fork, raise issues, or submit pull requests if you’d like to contribute or improve the project!



