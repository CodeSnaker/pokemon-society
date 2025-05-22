import express from 'express';
import {
  deleteType,
  getAllTypes,
  getTypeById,
  postType,
  updateType,
} from '../controllers/types.controllers.js';
import { checkContentJSON } from '../middlewares/content.js';

const typeRoutes = express.Router();

typeRoutes.get('/types', getAllTypes); // get all pokemon types

typeRoutes.get('/types/:id', getTypeById); // get all information on one type

typeRoutes.post('/types', checkContentJSON, postType); // Insert a pokemon type

typeRoutes.put('/types/:id', checkContentJSON, updateType); // Update a type

typeRoutes.delete('/types/:id', deleteType); // Delete a type

export default typeRoutes;
