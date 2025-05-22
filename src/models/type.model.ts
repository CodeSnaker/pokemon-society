import { ResultSetHeader, RowDataPacket } from 'mysql2';
import Model from './model.js';
import pool from '../db/db.js';

export interface Type extends RowDataPacket {
  id: number;
  identifier: string;
  generation_id: number;
  damage_class_id: number;
}

class TypeModel implements Model {
  async save(type: Type) {
    const [res] = await pool.query<ResultSetHeader>('INSERT INTO types VALUES (?,?,?,?);', [
      type.id,
      type.identifier,
      type.generation_id,
      type.damage_class_id,
    ]);
    return res;
  }

  async getAll<Type>() {
    const [types] = await pool.query<RowDataPacket[]>('SELECT * FROM types;');
    return types as Type[];
  }

  async getById<Type>(id: number) {
    const [types] = await pool.query<RowDataPacket[]>('SELECT * FROM types WHERE id=?;', [id]);
    return types as Type[];
  }

  async update(type: Type, id: number) {
    const [queryRes] = await pool.query<ResultSetHeader>(
      'UPDATE types SET id=?, identifier=?, generation_id=?, damage_class_id=? WHERE id=?;',
      [type?.id, type?.identifier, type?.generation_id, type?.damage_class_id, id],
    );
    return queryRes;
  }

  async delete(id: number) {
    const [res] = await pool.query<ResultSetHeader>('DELETE FROM types WHERE id = ?', [id]);
    return res;
  }
}

export default new TypeModel();
