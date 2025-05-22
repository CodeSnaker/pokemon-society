import { ResultSetHeader, RowDataPacket } from 'mysql2';

export interface RestrictedModel {
  getAll<T>(): Promise<T[]>;

  getById<T>(id: number): Promise<T[]>;
}

export default interface Model extends RestrictedModel {
  save(data: RowDataPacket): Promise<ResultSetHeader>;

  update(data: RowDataPacket, id: number): Promise<ResultSetHeader>;

  delete(id: number): Promise<ResultSetHeader>;
}
