import { RowDataPacket } from 'mysql2';
import { RestrictedModel } from './model.js';
import pool from '../db/db.js';
import { Pokemon } from './pokemon.model.js';

export interface PokemonEggs extends Pokemon {
  egg_groups: { id: string; identifier: string }[];
}

class PokemonEggsModel implements RestrictedModel {
  async getAll<PokemonEggs>() {
    const [pokemons] = await pool.query<RowDataPacket[]>('SELECT * FROM pokemon_egg_groups_view;');
    return pokemons as PokemonEggs[];
  }

  async getById<PokemonEggs>(id: number) {
    const [pokemons] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM pokemon_egg_groups_view WHERE id=?;',
      [id],
    );
    return pokemons as PokemonEggs[];
  }
}

export default new PokemonEggsModel();
