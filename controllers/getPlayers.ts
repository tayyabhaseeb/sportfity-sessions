const { fetchPlayers } = require("../models/playerModel");
import { Request, Response } from "express";

function getPlayers(req: Request, res: Response): void {
  fetchPlayers().then((players) => {
    res.status(200).send({ players });
  });
}

module.exports = { getPlayers };
