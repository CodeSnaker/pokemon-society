import logger from '../logging/logger.js';
import TypeModel from '../models/type.model.js';
import { Request, Response } from 'express';

export const getAllTypes = async (req: Request, res: Response) => {
  await TypeModel.getAll()
    .then((types) => {
      logger.info('Retrieved all pokemon types.');
      if (types.length === 0) {
        logger.debug('No types to retrieve');
        res.status(204).json();
      } else res.status(200).json(types);
    })
    .catch((err) => {
      logger.error('Error while retrieving pokemon types.');
      res.status(404).json({ message: "Couldn't retrieve pokemon types.", error: err });
    });
};

export const getTypeById = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    logger.error(`Bad id: ${req.params.id}`);
    res.status(400).json({ message: 'Bad id.' });
    return;
  }

  await TypeModel.getById(id)
    .then((types) => {
      logger.info(`Retrieved Pokemon type with id = ${id}.`);
      if (types.length === 0) {
        logger.debug(`No type with id ${id} to retrieve`);
        res.status(204).json();
      } else res.status(200).json(types[0]);
    })
    .catch((err) => {
      logger.error(`Couldn't find pokemon type with id = ${id}`);
      res.status(404).json({ message: 'Pokemon type not found.', error: err });
    });
};

export const postType = async (req: Request, res: Response) => {
  if (!req.body.type) {
    res.status(400).json({ message: 'type object did not exist in request body.' });
    return;
  }
  try {
    await TypeModel.save(req.body.type);
    res.status(201).json({ message: 'Type successfully created.' });
  } catch (err: any) {
    if (err.code === 'ER_DUP_ENTRY') {
      logger.error(`Entry with ID ${req.body.type.id} already exists`);
      res
        .status(409)
        .json({ message: `Entry with ID ${req.body.type.id} already exists`, error: err });
    } else {
      logger.error('Error while trying to insert new row into types table.');
      res.status(400).json({ message: 'New entry is not valid.', error: err });
    }
  }
};

export const updateType = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    logger.error(`Bad id: ${req.params.id}`);
    res.status(400).json({ message: 'Bad id.' });
    return;
  }
  if (!req.body.type) {
    res.status(400).json({ message: 'type object did not exist in request body.' });
    return;
  }

  try {
    const queryRes = await TypeModel.update(req.body.type, id);
    if (queryRes.affectedRows > 0) {
      logger.debug(`Type with id = ${id} was successfully updated.`);
      res.status(201).json({ message: `Type with id = ${id} successfully updated.` });
    } else {
      logger.error(`Type with id = ${id} doesn't exist`);
      res.status(404).json({ message: `Type with id = ${id} wasn't found.` });
    }
  } catch (err: any) {
    if (err.code === 'ER_DUP_ENTRY') {
      logger.error(`Entry with ID ${req.body.type.id} already exists`);
      res
        .status(409)
        .json({ message: `Entry with ID ${req.body.type.id} already exists`, error: err });
    } else {
      logger.error('Error while trying to insert new row into type table.');
      res
        .status(500)
        .json({ message: 'Error while trying to insert new row into type table.', error: err });
    }
  }
};

export const deleteType = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    logger.error(`Bad id: ${req.params.id}`);
    res.status(400).json({ message: 'Bad id.' });
    return;
  }

  try {
    const queryRes = await TypeModel.delete(id);
    if (queryRes.affectedRows > 0) {
      logger.debug(`Type with id = ${id} was successfully deleted.`);
      res.status(200).json({ message: `Successfully deleted type with id = ${id}` });
    } else {
      logger.error(`Type with id = ${id} doesn't exist`);
      res.status(404).json({ message: `Type with id = ${id} wasn't found.` });
    }
  } catch (err: any) {
    logger.error(`Error while trying to delete type with ${id}.`);
    res
      .status(500)
      .json({ message: `Error while trying to delete type with id = ${id}`, error: err });
  }
};
