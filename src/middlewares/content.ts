import { NextFunction, Request, Response } from 'express';

export const checkContentJSON = (req: Request, res: Response, next: NextFunction) => {
  if (req.is('application/json')) {
    next();
  } else {
    res.status(400).json({ message: 'Content-type is not application/json' });
  }
};
