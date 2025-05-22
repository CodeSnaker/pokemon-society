import logger from '../logging/logger.js';
import PokemonModel from '../models/pokemon.model.js';
import { Request, Response } from 'express';

export const getAllPokemon = (req: Request, res: Response) => {
  PokemonModel.getAll()
    .then((pokemons) => {
      logger.debug('Pokemons retrieved.');
      if (pokemons.length === 0) {
        logger.debug('No pokemon to retrieve');
        res.status(204).json();
      } else res.status(200).json(pokemons);
    })
    .catch((err) => {
      logger.error('Error while retrieving all pokemons.');
      res.status(404).json({ message: "Pokemons Couldn't be retrieved.", error: err });
    });
};

export const getPokemonById = (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    logger.error(`Bad id: ${req.params.id}`);
    res.status(400).json({ message: 'Bad id.' });
    return;
  }
  PokemonModel.getById(id)
    .then((pokemons) => {
      logger.debug(`Pokemon with id = ${id} retrieved.`);
      if (pokemons.length === 0) {
        logger.debug(`No pokemon with id ${id} to retrieve`);
        res.status(204).json();
      } else res.status(200).json(pokemons[0]);
    })
    .catch((err) => {
      logger.error(`Error while retrieving single pokemon with ${id}.`);
      res.status(404).json({ message: `Couldn't retrieve pokemon with id = ${id}.`, error: err });
    });
};

export const postPokemon = async (req: Request, res: Response) => {
  if (!req.body.pokemon) {
    res.status(400).json({ message: 'pokemon object did not exist in request body.' });
    return;
  }
  try {
    await PokemonModel.save(req.body.pokemon);
    logger.debug('Pokemon was successfully created.');
    res.status(201).json({ message: 'Pokemon successfully created.' });
  } catch (err: any) {
    if (err.code === 'ER_DUP_ENTRY') {
      logger.error(`Entry with ID ${req.body.pokemon.id} already exists`);
      res
        .status(409)
        .json({ message: `Entry with ID ${req.body.pokemon.id} already exists`, error: err });
    } else {
      logger.error('Error while trying to insert new row into pokemon table.');
      res
        .status(500)
        .json({ message: 'Error while trying to insert new row into pokemon table.', error: err });
    }
  }
};

export const updatePokemon = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    logger.error(`Bad id: ${req.params.id}`);
    res.status(400).json({ message: 'Bad id.' });
    return;
  }

  try {
    const queryRes = await PokemonModel.update(req.body.pokemon, id);
    if (queryRes.affectedRows > 0) {
      logger.debug(`Pokemon with id = ${id} was successfully updated.`);
      res.status(201).json({ message: `Pokemon with id = ${id} successfully updated.` });
    } else {
      logger.error(`Pokemon with id = ${id} doesn't exist`);
      res.status(404).json({ message: `Pokemon with id = ${id} wasn't found.` });
    }
  } catch (err: any) {
    if (err.code === 'ER_DUP_ENTRY') {
      logger.error(`Entry with ID ${req.body.pokemon.id} already exists`);
      res
        .status(409)
        .json({ message: `Entry with ID ${req.body.pokemon.id} already exists`, error: err });
    } else {
      logger.error('Error while trying to insert new row into pokemon table.');
      res
        .status(500)
        .json({ message: 'Error while trying to insert new row into pokemon table.', error: err });
    }
  }
};

export const deletePokemon = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    logger.error(`Bad id: ${req.params.id}`);
    res.status(400).json({ message: 'Bad id.' });
    return;
  }

  try {
    const queryRes = await PokemonModel.delete(id);
    if (queryRes.affectedRows > 0) {
      logger.debug(`Pokemon with id = ${id} was successfully deleted.`);
      res.status(200).json({ message: `Successfully deleted pokemon with id = ${id}` });
    } else {
      logger.error(`Pokemon with id = ${id} doesn't exist`);
      res.status(404).json({ message: `Pokemon with id = ${id} wasn't found.` });
    }
  } catch (err: any) {
    logger.error(`Error while trying to delete pokemon with ${id}.`);
    res
      .status(500)
      .json({ message: `Error while trying to delete pokemon with id = ${id}`, error: err });
  }
};
