import logger from '../logging/logger.js';
import PokemonTypesModel from '../models/pokemon.types.model.js';
import { Request, Response } from 'express';

export const getAllPokeTypes = async (req: Request, res: Response) => {
  await PokemonTypesModel.getAll()
    .then((pokemons) => {
      logger.debug('Pokemons and types retrieved.');
      if (pokemons.length === 0) {
        logger.debug('No pokemon and types to retrieve');
        res.status(204).json();
      } else res.status(200).json(pokemons);
    })
    .catch((err) => {
      logger.error('Error while retrieving all pokemons and types.');
      res.status(404).json({ message: "Pokemons and types Couldn't be retrieved." });
    });
};

export const getPokeTypesById = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    logger.error(`Bad id: ${req.params.id}`);
    res.status(400).json({ message: 'Bad id.' });
    return;
  }
  await PokemonTypesModel.getById(id)
    .then((pokemons) => {
      logger.debug(`Pokemon and types with id = ${id} retrieved.`);
      if (pokemons.length === 0) {
        logger.debug(`No pokemon and types with id ${id} to retrieve`);
        res.status(204).json();
      } else res.status(200).json(pokemons[0]);
    })
    .catch((err) => {
      logger.error(`Error while retrieving single pokemon and types with ${id}.`);
      res.status(404).json({ message: `Couldn't retrieve pokemon and types with id = ${id}.` });
    });
};
