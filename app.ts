import express, { Application, Request, Response } from "express";
const app: Application = express();

const { getPlayers } = require("./controllers/getPlayers");

app.get("/api/players", getPlayers);
