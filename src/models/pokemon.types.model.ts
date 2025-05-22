import { RowDataPacket } from 'mysql2';
import { RestrictedModel } from './model.js';
import pool from '../db/db.js';
import { Pokemon } from './pokemon.model.js';

export interface PokemonTypes extends Pokemon {
  types: { id: string; identifier: string }[];
}

class PokemonTypesModel implements RestrictedModel {
  async getAll<PokemonTypes>() {
    const [pokemons] = await pool.query<RowDataPacket[]>('SELECT * FROM pokemon_types_view;');
    return pokemons as PokemonTypes[];
  }

  async getById<PokemonTypes>(id: number) {
    const [pokemons] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM pokemon_types_view WHERE id=?;',
      [id],
    );
    return pokemons as PokemonTypes[];
  }
}

export default new PokemonTypesModel();
