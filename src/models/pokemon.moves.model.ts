import { RowDataPacket } from 'mysql2';
import { RestrictedModel } from './model.js';
import pool from '../db/db.js';
import { Pokemon } from './pokemon.model.js';

export interface PokemonMoves extends Pokemon {
  moves: { id: string; identifier: string }[];
}

class PokemonMovesModel implements RestrictedModel {
  async getAll<PokemonMoves>() {
    const [pokemons] = await pool.query<RowDataPacket[]>('SELECT * FROM pokemon_moves_view;');
    return pokemons as PokemonMoves[];
  }

  async getById<PokemonMoves>(id: number) {
    const [pokemons] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM pokemon_moves_view WHERE id=?;',
      [id],
    );
    return pokemons as PokemonMoves[];
  }
}

export default new PokemonMovesModel();
