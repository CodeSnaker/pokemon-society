import { ResultSetHeader, RowDataPacket } from 'mysql2';
import Model from './model.js';
import pool from '../db/db.js';

export interface Pokemon extends RowDataPacket {
  id: number;
  identifier: string;
  species_id: number;
  height: number;
  weight: number;
  base_experience: number;
  order: number;
  is_default: 0 | 1;
}

class PokemonModel implements Model {
  async save(pokemon: Pokemon) {
    const [res] = await pool.query<ResultSetHeader>(
      `INSERT INTO pokemon VALUES (?,?,?,?,?,?,?,?);`,
      [
        pokemon?.id,
        pokemon?.identifier,
        pokemon?.species_id,
        pokemon?.height,
        pokemon?.weight,
        pokemon?.base_experience,
        pokemon?.order,
        pokemon?.is_default,
      ],
    );
    return res;
  }

  async getAll<Pokemon>() {
    const [pokemons] = await pool.query<RowDataPacket[]>('SELECT * FROM pokemon;');
    return pokemons as Pokemon[];
  }

  async getById<Pokemon>(id: number) {
    const [pokemons] = await pool.query<RowDataPacket[]>('SELECT * FROM pokemon WHERE id=?;', [id]);
    return pokemons as Pokemon[];
  }

  async update(pokemon: Pokemon, id: number) {
    const [queryRes] = await pool.query<ResultSetHeader>(
      'UPDATE pokemon SET id=?, identifier=?, species_id=?, height=?, weight=?, base_experience=?, `order`=?, is_default=? WHERE id=?;',
      [
        pokemon?.id,
        pokemon?.identifier,
        pokemon?.species_id,
        pokemon?.height,
        pokemon?.weight,
        pokemon?.base_experience,
        pokemon?.order,
        pokemon?.is_default,
        id,
      ],
    );
    return queryRes;
  }

  async delete(id: number) {
    const [res] = await pool.query<ResultSetHeader>('DELETE FROM pokemon WHERE id = ?;', [id]);
    return res;
  }
}

export default new PokemonModel();
