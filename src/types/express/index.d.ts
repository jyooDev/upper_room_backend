import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: object; // TODO: make type here
    }
  }
}
