import express from 'express';
import {
  deletePokemon,
  getAllPokemon,
  getPokemonById,
  postPokemon,
  updatePokemon,
} from '../controllers/pokemon.controllers.js';
import { getAllPokeTypes, getPokeTypesById } from '../controllers/pokemon.types.controllers.js';
import { getAllPokeEggs, getPokeEggsById } from '../controllers/pokemon.eggs.controllers.js';
import { getAllPokeMoves, getPokeMovesById } from '../controllers/pokemon.moves.controllers.js';
import { checkContentJSON } from '../middlewares/content.js';

const pokemonRoutes = express.Router();

pokemonRoutes.get('/pokemon', getAllPokemon); // get all pokemons

pokemonRoutes.get('/pokemon/:id', getPokemonById); // get all information on one pokemon

pokemonRoutes.post('/pokemon', checkContentJSON, postPokemon); // insert pokemon in table pokemon

pokemonRoutes.put('/pokemon/:id', checkContentJSON, updatePokemon); // update data on one pokemon

pokemonRoutes.delete('/pokemon/:id', deletePokemon); // delete one pokemon

pokemonRoutes.get('/pokemon-types', getAllPokeTypes); // Get all pokemons + their types

pokemonRoutes.get('/pokemon-types/:id', getPokeTypesById);

pokemonRoutes.get('/pokemon-eggs', getAllPokeEggs);

pokemonRoutes.get('/pokemon-eggs/:id', getPokeEggsById);

pokemonRoutes.get('/pokemon-moves', getAllPokeMoves);

pokemonRoutes.get('/pokemon-moves/:id', getPokeMovesById);

export default pokemonRoutes;
