import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import typeRoutes from './routes/types.routes.js';
import pokemonRoutes from './routes/pokemon.routes.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: '*',
    methods: ['GET'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200,
  }),
);

app.use('/api', pokemonRoutes);
app.use('/api', typeRoutes);

export default app;
