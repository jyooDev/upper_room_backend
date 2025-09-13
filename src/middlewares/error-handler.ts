import { Request, Response, NextFunction } from 'express';

function errorHandler(err: any, req: Request, res: Response) {
  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({ message, error: err });
}

export default errorHandler;
