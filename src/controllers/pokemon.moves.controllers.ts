import logger from '../logging/logger.js';
import PokemonMovesModel from '../models/pokemon.moves.model.js';
import { Request, Response } from 'express';

export const getAllPokeMoves = async (req: Request, res: Response) => {
  await PokemonMovesModel.getAll()
    .then((pokemons) => {
      logger.info('Pokemons and moves retrieved.');
      if (pokemons.length === 0) {
        logger.info('No pokemon and moves to retrieve');
        res.status(204).json();
      } else res.status(200).json(pokemons);
    })
    .catch((err) => {
      logger.error('Error while retrieving all pokemons and moves.');
      res.status(404).json({ message: "Pokemons and moves Couldn't be retrieved." });
    });
};

export const getPokeMovesById = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    logger.error(`Bad id: ${req.params.id}`);
    res.status(400).json({ message: 'Bad id.' });
    return;
  }
  await PokemonMovesModel.getById(id)
    .then((pokemons) => {
      logger.info(`Pokemon and moves with id = ${id} retrieved.`);
      if (pokemons.length === 0) {
        logger.info(`No pokemon and moves with id ${id} to retrieve`);
        res.status(204).json();
      } else res.status(200).json(pokemons[0]);
    })
    .catch((err) => {
      logger.error(`Error while retrieving single pokemon and moves with ${id}.`);
      res.status(404).json({ message: `Couldn't retrieve pokemon and moves with id = ${id}.` });
    });
};
