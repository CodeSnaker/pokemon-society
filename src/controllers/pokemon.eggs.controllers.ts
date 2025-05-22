import logger from '../logging/logger.js';
import PokemonEggsModel from '../models/pokemon.eggs.model.js';
import { Request, Response } from 'express';

export const getAllPokeEggs = async (req: Request, res: Response) => {
  await PokemonEggsModel.getAll()
    .then((pokemons) => {
      logger.debug('Pokemons and eggs retrieved.');
      if (pokemons.length === 0) {
        logger.debug(`No pokemon and eggs to retrieve`);
        res.status(204).json();
      } else res.status(200).json(pokemons);
    })
    .catch((err) => {
      logger.error('Error while retrieving all pokemons and eggs.');
      res.status(404).json({ message: "Pokemons and eggs Couldn't be retrieved." });
    });
};

export const getPokeEggsById = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    logger.error(`Bad id: ${req.params.id}`);
    res.status(400).json({ message: 'Bad id.' });
    return;
  }
  await PokemonEggsModel.getById(id)
    .then((pokemons) => {
      logger.debug(`Pokemon and eggs with id = ${id} retrieved.`);
      console.log(pokemons);
      if (pokemons.length === 0) {
        logger.debug(`No pokemon and eggs with id ${id} to retrieve`);
        res.status(204).json();
      } else res.status(200).json(pokemons[0]);
    })
    .catch((err) => {
      logger.error(`Error while retrieving single pokemon and eggs with ${id}.`);
      res.status(404).json({ message: `Couldn't retrieve pokemon and eggs with id = ${id}.` });
    });
};
